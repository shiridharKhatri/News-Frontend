import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="det">
          <h1>
            Explore all the latest news in our website over{" "}
            <span id="numTimer">1000+</span> sources
          </h1>
          <h2>Subscribe us and be notified</h2>
          <Link to="news">
            <button className="cssbuttons-io-button">
              {" "}
              Get started
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
