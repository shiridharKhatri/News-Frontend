import React, { Component } from "react";
export default class Scroll extends Component {

  render() {
    return (
      <>
        <div className="scrolldown" style={{color: "skyblue"}}>
          <div className="chevrons">
            <div className="chevrondown"></div>
            <div className="chevrondown"></div>
          </div>
        </div>
      </>
    );
  }
}