import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuLogo from "./images/menuLogo.png";
export default class Nevbar extends Component {
  render() {
    const labelMenu = () => {
      let ul = document.querySelector("ul");
      ul.style.right = "0";
    };
    const labelMenuClose = () => {
      let ul = document.querySelector("ul");
      ul.style.right = "-30%";
    };
    const onMouseLeave = () => {
      let ul = document.querySelector("ul");
      ul.style.right = "-30%";
    };
    const scrolled = () => {
      let nav = document.querySelector("nav");
      if (document.documentElement.scrollTop > 150) {
        nav.style.backgroundColor = "black";
        nav.style.position = "fixed";
        nav.style.zIndex = "99";
      } else {
        nav.style.backgroundColor = "transparent";
        nav.style.position = "fixed";
        nav.style.zIndex = "99";
      }
    };
    window.onscroll = scrolled;
    let { url, onchangeVal, onSubmitVal, inpValue } = this.props;
    return (
      <div className="nevbar">
        <nav>
          <Link to="/">
            <img src={url} alt="logo" height="300px" />
          </Link>
          {/*
            <form  onSubmit={onSubmitVal} >
            <input
              type="search"
              value={inpValue}
              onChange={onchangeVal}
              placeholder="Search..."
            />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            </form>
          </div> */}
           <div className="inpSec">
          <form className="form"  onSubmit={onSubmitVal}>
            <label htmlFor="search">
              <input
               value={inpValue}
               onChange={onchangeVal}
                className="input"
                type="text"
                placeholder="Search..."
                id="search"
              />
              <div className="fancy-bg"></div>
              <div className="search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
              </div>
            </label>
          </form>
          </div>

          <div className="filter">
            <select name="Sort By" id={this.props.id}>
              <option value="relevancy">Relevancy</option>
              <option defaultValue value="popularity">
                Popularity
              </option>
              <option value="publishedAt">PublishedAt</option>
            </select>
            <input type="date" name="date" id={this.props.idInp} />
          </div>
          <span className="labelMenu">
            <i onClick={labelMenu} className="fa-solid fa-bars"></i>{" "}
          </span>
          <ul onMouseLeave={onMouseLeave}>
            <Link to="/">
              <li>
                <i className="fa-solid fa-house"></i> Home
              </li>
            </Link>
            <Link to="/about">
              <li>
                <i className="fa-solid fa-circle-info"></i> About
              </li>
            </Link>
            <Link to="/weather">
              <li>
                <i className="fa-solid fa-cloud"></i> Weather
              </li>
            </Link>
            <Link to="/category">
              <li>
                <i className="fa-solid fa-newspaper"></i> Category
              </li>
            </Link>
            <Link to="/contact">
              <li>
                <i className="fa-solid fa-envelope"></i> Contact
              </li>
            </Link>
            <span onClick={labelMenuClose} className="labelMenuClose">
              <img src={menuLogo} alt="icon" />
              <h5>Main Menu</h5>
            </span>
            <hr />
            <p>Follow Us</p>
            <div className="social-icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin-in"></i>
              <i className="fa-brands fa-github"></i>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}
