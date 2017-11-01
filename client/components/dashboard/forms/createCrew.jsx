// here crew_leader will create a new crew, just a basic layoout... we can change it with react bootstrap later
import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { PostCrew } from '../../utils/requests.jsx';
import { Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import cloudinary from 'cloudinary-core';
import request from 'superagent';
import {cloud_name, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL} from './configfile.js'

export default class CreateCrew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
    }
    // props contain name and unique details of user, so we can keep track of who created this crew  and store it in database accordingly
    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.name)
      console.log(this.desc);
      console.log(this.img)
      var obj = {
        name: this.name.value,
        description: this.description.value,
        image: this.state.uploadedFileCloudinaryUrl
      }
      // console.log(obj)
      PostCrew(obj, props.user.id, function (err, data) {
        if (err) {
          console.log('error in posting');
        }
        if (data) {
          props.getCurrentCrews(props.user.id);
          name = '';
          description = '';
          setState({uploadedFileCloudinaryUrl: ''})
        }
      })
    }
  }

  image(e) {
    this.img = e.target.value
    console.log(this.img, 'thisimg')
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    }, function(err, done) {
      if (done) {
        console.log(this.state.uploadedFile)
      }
    })
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
  let upload = request.post(CLOUDINARY_UPLOAD_URL)
                      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                      .field('file', file)

  upload.end((err, response) => {
    if (err) {
      console.log(err);
    }

    if (response.body.secure_url !== '') {
      this.setState({
        uploadedFileCloudinaryUrl: response.body.secure_url
      });
    }
  })
  }

  render() {
    console.log(this.props, 'yp')
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl type="text" placeholder="Enter the name of Crew" name="crewname" inputRef={ref => this.name = ref} defaultValue={this.props.name}/><br/>
            <FormControl componentClass="textarea" placeholder="enter description" inputRef={ref => this.description = ref} defaultValue={this.props.desc}/><br/>
            <Dropzone
              muliple="false"
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>

              {this.state.uploadedFileCloudinaryUrl !== '' ?
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <Image cloudName="sarikonda" publicId={this.state.uploadedFileCloudinaryUrl} width="200" height="100" crop="scale"/>
              </div> : <div>
              <p>Drop an image or click to select a file to upload.</p>
              </div>}

            </Dropzone>
            <Button type="submit">
               Create/Update
            </Button>
        </FormGroup>
        </form>
      </div>
    )
  }
}

// <Image cloudName="sarikonda" publicId="flower" width="300" crop="scale"/>