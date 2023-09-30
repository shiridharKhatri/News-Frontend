import React, { Component } from "react";
import abc from "./sources/abc.png";
import bbc from "./sources/bbc.png";
import cbc from "./sources/cbc.png";
import cnn from "./sources/cnn.png";
import msnbc from "./sources/msnbc.png";
import usatoday from "./sources/usatoday.png";
export default class Sources extends Component {
  render() {
    return (
      <>
        <section className="sourcesImg">
          <h1>News Sources</h1>
          <div className="fl-dis-source-img">
            <div className="img-one imagesSource ">
              {" "}
              <a
                href="https://edition.cnn.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={cnn} alt="cnn" />
              </a>
            </div>
            <div className="img-two imagesSource ">
              {" "}
              <a
                href="https://abcnews.go.com/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img src={abc} alt="abc" />
              </a>
            </div>
            <div className="img-three imagesSource ">
              {" "}
              <a
                href="https://www.bbc.com/news"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img src={bbc} alt="bbc" />
              </a>
            </div>
            <div className="img-four imagesSource ">
              {" "}
              <a
                href="https://www.cbc.ca/news"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img src={cbc} alt="cbc" />
              </a>
            </div>
            <div className="img-five imagesSource ">
              {" "}
              <a href="https://www.msnbc.com/" target="_blank" rel="noreferrer">
                {" "}
                <img src={msnbc} alt="msnbc" />
              </a>
            </div>
            <div className="img-six imagesSource ">
              {" "}
              <a
                href="https://www.usatoday.com/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img src={usatoday} alt="usatoday" />
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
}
