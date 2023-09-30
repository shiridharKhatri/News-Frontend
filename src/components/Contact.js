import React, { Component } from "react";
import Footer from "./Footer";
export default class Contact extends Component {
  render() {
    return (
      <>
        <div className="containerFour">
          <h1>Contact us</h1>
          <h4>Contact us if you need any help from us</h4>
          <div className="mainSec">
            <div className="formSec">
              <form action="">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Please enter your full name"
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  placeholder="Enter your valid email"
                />
                <label htmlFor="number">Number</label>
                <input
                  type="number"
                  id="number"
                  placeholder="Enter your valid number"
                />
                <label htmlFor="message">Message</label>
                <textarea
                  name=""
                  id="message"
                  placeholder="Type your message"
                />
                {/* <button>Submit</button> */}

                <button>
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </button>
              </form>
            </div>
            <div className="details"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
