import React, { Component } from "react";
import logo from './images/menuLogo.png';
export default class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div className="containerFive">
            <div className="display dislayOne"><img src={logo} alt="logo" height="150px"/></div>
            <div className="display dislayTwo">
                <ul>
                    <li className="Head">About</li>
                    <li>Home</li>
                    <li>Contact</li>
                    <li>Help</li>
                </ul>
            </div>
            <div className="display dislayThree">
                <ul>
                    <li className="Head">Services</li>
                    <li>Blog</li>
                    <li>Post</li>
                    <li>Rate us</li>
                </ul>
            </div>
            <div className="display dislayFour">
                <ul>
                    <li className="Head">More</li>
                    <li>Weather</li>
                    <li>Footage</li>
                    <li>Photos</li>
                </ul>
            </div>
            <div className="display dislayFive">
                <label htmlFor="Feedback">Send us Feedback</label>
                <input type="text" name="Feedback" id="Feedback" placeholder="Send us your feedback"/>
                <button>Send</button>
            </div>
          </div>
          <div className="containerSix">
            <ul>
                <li><a href="https://www.facebook.com"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li><a href="https://www.twitter.com"><i className="fa-brands fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://www.linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a></li>
                <li><a href="https://www.github.com"><i className="fa-brands fa-github"></i></a></li>
            </ul>
            <p>&copy;Copyright, All rights reserved.</p>
          </div>
        </footer>
      </>
    );
  }
}