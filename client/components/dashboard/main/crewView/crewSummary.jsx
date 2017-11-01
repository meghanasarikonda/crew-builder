// This component renders a crewSummary card with some information and a picture
import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import { Image, Transformation } from 'cloudinary-react';

export default class CrewSummary extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.currentCrew) {
      return (
        <div />
      )
    } else {
      // if (this.props.currentCrew.crew.image) {
      //   if (currentCrewUrl) {
      //     console.log
      //   } else {
      //     var cloudId = this.props.currentCrew.crew.image;
      //     console.log(currentCrewUrl, 'currentCrewUrl')
      //     console.log(this.props.currentCrew.crew.image, 'image')
      //     var currentCrewUrl = this.props.currentCrew.crew.image
      //   }
      // }
      console.log(this.props.currentCrew.crew.image, 'image')
      var str = this.props.currentCrew.crew.image;
      str = str.split('/')
      var publicId = str[str.length - 1]

      // var str = this.props.currentCrew.crew.image;
      // str = str.split('/')
      // var publicId = str[str.length - 1]

    const achievementLevel = this.props.currentCrew.achievement !== "none" ?
      `Your achievement level with this crew is ${this.props.currentCrew.achievement}` :
      `Complete some tasks to help the cause and gain achievements!`;

      return (
        <div>
          <Media>
            <Media.Left>


<Image cloudName="sarikonda" publicId={publicId} >
  <Transformation width="300" height="100" crop="scale" />
</Image>

            </Media.Left>
            <Media.Body>
              <Media.Heading>{this.props.currentCrew.crew.name}</Media.Heading>
              <h5> <strong>{this.props.currentCrew.role}</strong> </h5>
              <p>You have {this.props.currentCrew.points} points with this crew!</p>
              <p>{achievementLevel}</p>
            </Media.Body>
          </Media>
        </div>
      );
    }
  }
}

// <img src={this.props.currentCrew.crew.image} alt='Image'/>

// <Image cloudName="sarikonda" src={this.props.currentCrew.crew.image} >
//   <Transformation width="300" height="100" crop="scale" />
// </Image>