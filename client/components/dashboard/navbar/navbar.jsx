import React, { Component } from 'react';
import Form, { Input, Fieldset } from 'react-bootstrap-form';

import createBrowserHistory from 'history/createBrowserHistory';

import Search from './search.jsx';
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    // notifications may go into dropdown

    this.handleClickLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem('id_token');
      // access BrowserRouter history
      const customHistory = createBrowserHistory();
      // push root '/' path and reload window
      customHistory.push('/');
      window.location.reload();
    }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(this.state.value)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
             <Navbar.Brand>
              <a href="/">Crew</a>
             </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <Navbar.Form pullLeft>
                  <FormGroup role="form">
                    <FormControl type="text" placeholder="Search" value={this.state.value} onChange={this.handleChange}/>
                    <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                  </FormGroup>
                </Navbar.Form>
              </NavItem>
              <NavItem>
                <Navbar.Form pullLeft>
                  <Button type="submit" onClick={()=> alert('cool')}>Browse</Button>
                </Navbar.Form>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<img className="avatar" src="https://avatars1.githubusercontent.com/u/15957141?s=40&amp;v=4" height="30" width="30"/>} id="dropdown">
                <MenuItem eventKey={1.1} onClick={this.handleClickLogout}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}





