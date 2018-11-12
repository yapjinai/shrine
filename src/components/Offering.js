import React, { Component } from 'react'
import '../assets/css/Offering.css'

class Offering extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posX: 0,
      posY: 0,
      changeX: 0,
      changeY: 0,
      elmnt: null,
      style: JSON.parse(this.props.offering.style),
      item: {},
    }
  }

  render() {
    const offering = this.props.offering
    return (
      <div
        className="Offering"
        id={`item-${offering.id}`}
        style={this.getResizedStyle()}
        onMouseDown={this.handleMouseDown}
      >
        <img
          src={this.state.item.image}
          alt={this.state.item.name}
        />
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      elmnt: document.querySelector(`#item-${this.props.offering.id}`),
    })
    this.getItemFromOffering()
  }

////////////////////////////////////////////////////////////////////////

  getItemFromOffering = () => {
    fetch(`http://localhost:3000/api/v1/offerings/${this.props.offering.id}`)
    .then(res => res.json())
    .then(offering => {
      this.setState({
        item: offering.item
      }, () => this.setMaxWidthStyle())
    })
  }

  setMaxWidthStyle = () => {
    if (this.state.item && !this.state.style.maxWidth) {
      const newStyle = {...this.state.style}
      newStyle.maxWidth = this.state.item.size
      this.setState({
        style: newStyle
      })
    }
  }

////////////////////////////////////////////////////////////////////////

  handleMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.setState({
      posX: e.clientX,
      posY: e.clientY
    })
    document.onmouseup = this.handleMouseUp;
    // call a function whenever the cursor moves:
    document.onmousemove = this.handleMouseMove;
  }

  handleMouseMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    this.setState({
      changeX: this.state.posX - e.clientX,
      changeY: this.state.posY - e.clientY,
      posX: e.clientX,
      posY: e.clientY,
      style: this.getResizedStyle()
    })

    const elmnt = this.state.elmnt
    elmnt.style.top = (this.state.elmnt.offsetTop - this.state.changeY) + "px";
    elmnt.style.left = (this.state.elmnt.offsetLeft - this.state.changeX) + "px";
  }

  handleMouseUp = (e) => {
    const newX = parseInt(this.state.elmnt.style.left)
    const newY = parseInt(this.state.elmnt.style.top)
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    this.props.updateCoordinates(this.props.offering.id, newX, newY)
  }

  ////////////////////////////////////////////////////
  
  getResizedStyle = () => {
    const newStyle = {...this.state.style}
    if (this.state.elmnt) {
      const offsetTop = this.state.elmnt.offsetTop
      const windowHeight = window.innerHeight
      const ratio = offsetTop / windowHeight

      const maxWidth = parseInt(this.state.item.size)
      const m = maxWidth - 50
      const y = m * ratio + 50

      const newwidth = Math.floor(y)
      const newwidthString = `${newwidth}px`
      newStyle.maxWidth = newwidthString
    }
    return newStyle
  }

}

export default Offering
