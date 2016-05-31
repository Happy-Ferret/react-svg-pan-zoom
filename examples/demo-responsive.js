"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {ViewerResponsive, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM} from '../src/index';
import SnakeSVG from './svg/snake';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    let defaultValue = ViewerHelper.getDefaultValue();
    defaultValue = ViewerHelper.fitSVGToViewer(defaultValue, 1440, 1440, 500, 500);
    this.state = {value: defaultValue, tool: TOOL_NONE, x: 0, y: 0};
  }

  handleChange(event) {
    this.setState({value: event.value});
  }

  handleReset(event) {
    let {containerWidth, containerHeight} = this.refs.viewer.state;
    this.setState({value: ViewerHelper.fitSVGToViewer(this.state.value, 1440, 1440, containerWidth, containerHeight)})
  }

  handleClick(event) {
    console.log('click', event);
    console.log('X', event.x);
    console.log('Y', event.y);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.x,
      y: event.y
    });
  }

  handleChangeTool(event) {
    this.setState({tool: event.target.value});
  }

  render() {
    return (
      <div style={{display: "flex", height: "100%"}}>

        {/* col-1 */}
        <div style={{width: "50%", height: "100%"}}>
          <ViewerResponsive style={{border:'1px solid black'}} ref="viewer"
                  value={this.state.value} tool={this.state.tool}
                  onChange={event => this.handleChange(event)}
                  onClick={event => this.handleClick(event)}
                  onMouseMove={event => this.handleMouseMove(event)}>

            {SnakeSVG}

          </ViewerResponsive>
        </div>


        {/* col-2 */}
        <div style={{width: "50%", paddingLeft: "20px"}}>

          <h3>React SVG Pan Zoom Demo</h3>

          <ul style={{listStyle: "none", padding:"0px"}}>
            <li><input
              type="radio"
              value={TOOL_NONE}
              checked={this.state.tool === TOOL_NONE}
              onChange={event => this.handleChangeTool(event)}/>TOOL: NONE
            </li>
            <li><input
              type="radio"
              value={TOOL_PAN}
              checked={this.state.tool === TOOL_PAN}
              onChange={event => this.handleChangeTool(event)}/>TOOL: PAN
            </li>
            <li><input
              type="radio"
              value={TOOL_ZOOM}
              checked={this.state.tool === TOOL_ZOOM}
              onChange={event => this.handleChangeTool(event)}/>TOOL: ZOOM
            </li>
          </ul>

          <div>
            <button onClick={event => this.handleReset(event)}>Reset view</button>
          </div>

          <hr style={{border: "1px solid #aaa", borderTop: "0px"}}/>

        <span style={{color: "10px"}}>
          Note: <strong>Press Alt for zoom out</strong>
        </span>

          <div>
            Position: {this.state.x},{this.state.y}
          </div>
        </div>

      </div> // /cols

    );
  }
}
