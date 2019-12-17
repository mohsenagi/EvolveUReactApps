import React from 'react';
import './App.css';

import {Nav} from './components/Nav.js'
import {Game} from './components/TicTacToe.js'
import { CityandCommunity } from './components/Community.js'
import { LinkedListDisplay } from './components/LinkedListComponent.js'
import {Setting} from './components/Setting.js'

import {ThemeProvider} from './components/Contexts.js'
import {ThemeContext} from './components/Contexts.js'

import logo from './components/Icons/logo.svg';
import {ReactComponent as Handshake} from './components/Icons/Handshake.svg'
import {ReactComponent as TicTacToe} from './components/Icons/tic tac toe.svg'
import {ReactComponent as City} from './components/Icons/City.svg'
import {ReactComponent as LinkedList} from './components/Icons/LinkedList.svg'
import {ReactComponent as Settings} from './components/Icons/Settings.svg'

class AppHeader extends React.Component{
  static contextType = ThemeContext;
  render () {
    return (
      <div className={this.context.fontColor === "White" ? "App-header-White" : "App-header-Red"}>
      { this.props.clickedIcon === "Handshake" &&
      <div>
        <h3>{this.props.clickedIcon}</h3>
        <div className = "game">
        <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      }
      { this.props.clickedIcon === "tic tac toe" &&
        <div>
          <h3>Tic Tac Toe</h3>
          <Game />
        </div>
      }
      { this.props.clickedIcon === "City and Community" &&
      <div>
        <h3>Your Community</h3>
        <CityandCommunity />
      </div>
      }
      { this.props.clickedIcon === "LinkedList" &&
      <div>
        <h3>Linked List</h3>
        <LinkedListDisplay />
      </div>
      }
      { this.props.clickedIcon === "Settings" &&
      <div>
        <h3>Settings</h3>
        <Setting />
      </div>
      }
    </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      clickedIcon: "City and Community",
    };
  }
  onClickfunc = (name) => {
    if (name) {
      this.setState({
        clickedIcon: name,
      });
    }
  }
  render () {
    return (
      <ThemeProvider>
        <div className="Menue">
          <Nav />
          <div className="IconsContainer">
            <Handshake onClick = {() => this.onClickfunc("Handshake")}
            className= {"Icons" + (this.state.clickedIcon === "Handshake" ? " active" : "")} id="Handshake"/>
            <TicTacToe onClick = {() => this.onClickfunc("tic tac toe")}
            className= {"Icons" + (this.state.clickedIcon === "tic tac toe" ? " active" : "")} id="tic tac toe"/>
            <City onClick = {() => this.onClickfunc("City and Community")}
            className= {"Icons" + (this.state.clickedIcon === "City and Community" ? " active" : "")} id="City and Community"/>
            <LinkedList onClick = {() => this.onClickfunc("LinkedList")}
            className= {"Icons" + (this.state.clickedIcon === "LinkedList" ? " active" : "")} id="LinkedList"/>
            <Settings onClick = {() => this.onClickfunc("Settings")}
            className= {"Icons" + (this.state.clickedIcon === "Settings" ? " active" : "")} id="Settings"/>
          </div>
          <AppHeader clickedIcon ={this.state.clickedIcon} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
