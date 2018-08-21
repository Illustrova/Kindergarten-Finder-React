import React, { Component } from 'react';
import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import Map from './components/Map'
import facebookToken from './FacebookAPI'
import MenuButton from './components/MenuButton'

class App extends Component {

state = {
  sidebar:'closed',
}

openCloseMenu = () => {
  //Open and close sidebar function
  let body = document.querySelector('body')
    if(this.state.sidebar === 'closed'){
      body.classList.add('sidebar-open');
      this.setState({sidebar: 'open'})
    }else{
      body.classList.remove('sidebar-open');
      this.setState({sidebar: 'closed'})
    }
}

getToken = () => {
  return facebookToken();
}
  render() {

    return (
      <div className="App">
        <header className="header">
        <MenuButton
          openCloseMenu={this.openCloseMenu}
        />
      <div className="header_text">
          <h1>Kindergarten Finder</h1>
          <p className="header_subtitle">Search for a kindergarten, which accepts <b>ESPA voucher</b> in your neighbourhood</p>
      </div>
      </header>
  <Map google={this.props.google} openCloseMenu={this.openCloseMenu}/>

      </div>
    );
  }
}

export default App;