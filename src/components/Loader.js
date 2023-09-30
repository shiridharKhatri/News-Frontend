import React, { Component } from "react";
import "./loader.css";
export default class Loader extends Component {
  render() {
    return (
      <>
        <div className="loaderMain">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </div>
        </div>
      </>
    );
  }
}
