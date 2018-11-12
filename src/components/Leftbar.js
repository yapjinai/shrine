import React, { Component,PureComponent } from 'react'
import '../assets/css/Leftbar.css'

export default class Leftbar extends Component {

  state = {
    shown: false
  }

  move = () => {
    this.setState({shown: !this.state.shown})
  }

  render(){
    if(this.state.shown){
      return <div className="leftbar" onClick={this.move}></div>
      }
    else {
      return <div className="hidden-leftbar" onClick={this.move}></div>
      }
  }
}
