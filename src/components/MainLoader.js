import React, { Component } from "react";
import "./MainLoader.css";
export default class MainLoader extends Component {
  render() {
    return (
      <>
      <div className="loaderDiv">
        <figure className="Mainloader">
          <div className="dot white"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </figure>

      </div>
      </>
    );
  }
}