import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import walImage from "./images/wal.jpg";
import noimage from "./images/noimages.png";
import Scroll from "./Scroll";
import Footer from "./Footer";
import logoTwo from "./images/menuLogo.png";
import Sources from "./Sources";
// import Contact from "./Contact";
export default class Highlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      category: "technology",
      image: "",
      date: "",
      heading: "",
      name: "",
      totalResults: 0,
    };
    // document.title = this.state.category;
  }
  componentDidMount() {
    this.props.progress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.state.category}&pageSize=100`;
    this.props.progress(40);
    this.props.progress(60);
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": `${this.props.apiKey}`,
        },
      })
      .then((Response) => {
        this.props.progress(100);
        this.setState({
          articles: Response.data.articles,
          image: Response.data.articles[1].urlToImage,
          date: Response.data.articles[1].publishedAt,
          heading: Response.data.articles[1].description,
          links: Response.data.articles[1].url,
          name: Response.data.articles[1].source.name,
          totalResults: Response.data.totalResults,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const inpChangeOnClick = (event) => {
      this.props.progress(0);
      let ul = document.querySelector("ul");
      ul.classList.toggle("showMenu");
      let showCatBtn = document.getElementById("showCatBtn");
      if (ul.classList.contains("showMenu")) {
        showCatBtn.classList.add("fa-xmark");
      } else {
        showCatBtn.classList.remove("fa-xmark");
      }
      let urlTwo = `https://newsapi.org/v2/top-headlines?country=us&category=${event.target.value}&pageSize=100`;
      this.props.progress(50);
      axios
        .get(urlTwo, {
          headers: {
            Accept: "application/json",
            "X-Api-Key": `${this.props.apiKey}`,
          },
        })
        .then((Response) => {
          let topNews = document.querySelector('.topNews')
          topNews.scrollIntoView({ behavior: "smooth" });
          this.props.progress(100);
          this.setState({
            category: event.target.value,
            articles: Response.data.articles,
            image: Response.data.articles[1].urlToImage,
            date: Response.data.articles[1].publishedAt,
            heading: Response.data.articles[1].description,
            links: Response.data.articles[1].url,
            name: Response.data.articles[1].source.name,
            totalResults: Response.data.totalResults,
          });
          document.title = `Category - ${capitlizeText(event.target.value)}`;
        })
        .catch((error) => {
          this.props.progress(100);
          console.log(error);
        });
    };

    function capitlizeText(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
     
    const showCat = () => {
      let ul = document.querySelector("ul");
      ul.classList.toggle("showMenu");
      let showCatBtn = document.getElementById("showCatBtn");
      if (ul.classList.contains("showMenu")) {
        showCatBtn.classList.add("fa-xmark");
      } else {
        showCatBtn.classList.remove("fa-xmark");
      }
    };

    const scrolled = ()=>{
      let ul = document.querySelector('ul');
      if(document.documentElement.scrollTop > 150){
        ul.style.backgroundColor = "black";
        ul.style.position = "fixed";
        ul.style.zIndex = "99";
        ul.style.height = "9rem";
      
      }else{
        ul.style.backgroundColor = "transparent";
        ul.style.position = "fixed";
        ul.style.zIndex = "99";
      }
    }
    window.onscroll = scrolled;
    return (
      <>
        <section
          className="headerTwo"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)),
      url("${walImage}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1>
            <i onClick={showCat} id="showCatBtn" className="fa-solid fa-bars"></i>
          </h1>
          <ul>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-briefcase"></i>
              </span>{" "}
              <input
                onClick={inpChangeOnClick}
                type="button"
                value="business"
              />
            </li>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-clapperboard"></i>
              </span>{" "}
              <input
                onClick={inpChangeOnClick}
                type="button"
                value="entertainment"
              />
            </li>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-briefcase"></i>
              </span>{" "}
              <input onClick={inpChangeOnClick} type="button" value="general" />
            </li>
            <li>
              <Link to="/news" className="homeIco">
                <img src={logoTwo} alt="logo" />
              </Link>
            </li>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-briefcase-medical"></i>
              </span>{" "}
              <input onClick={inpChangeOnClick} type="button" value="health" />
            </li>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-flask"></i>
              </span>{" "}
              <input onClick={inpChangeOnClick} type="button" value="science" />
            </li>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-volleyball"></i>
              </span>{" "}
              <input onClick={inpChangeOnClick} type="button" value="sports" />
            </li>
            <li>
              <span className="ca-ico">
                <i className="fa-solid fa-microchip"></i>
              </span>{" "}
              <input
                onClick={inpChangeOnClick}
                type="button"
                value="technology"
              />
            </li>
          </ul>
          <div className="slogan">
            <h4>
              <span>News travels</span> fast in places where
            </h4>
            <h2>
              nothing much <span>ever happens</span>
            </h2>
            <Link to="./">
              <button className="blog">Blogs</button>
            </Link>
            <Link to="./">
              <button>About us</button>
            </Link>
          </div>
          <Scroll />
        </section>
        <section className="topNews">
          <h1>Top {this.state.category} News</h1>
          <h4>
            Total <span>{this.state.totalResults}</span> Results of{" "}
            {this.state.category}
          </h4>
          <div className="flexDisplay">
            <div
              className="item-1"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 1)),
              url("${!this.state.image ? `${walImage}` : this.state.image}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <b>Popular</b>
              <p>
                By {this.state.name === null ? `Unknown` : this.state.name} |{" "}
                <i className="fa-solid fa-calendar-days"></i>{" "}
                {this.state.date.slice(0, 10)}
              </p>
              <a href={this.state.links}>
                <h3>
                  {this.state.heading === null
                    ? `${this.state.links}`
                    : this.state.heading}
                </h3>
              </a>
            </div>
            <div className="item-2">
              {this.state.articles.map((e) => {
                return (
                  <div className="dis-sc-2" key={e.url}>
                    <div className="imgSec">
                      <img
                        src={
                          e.urlToImage === null ? `${noimage}` : e.urlToImage
                        }
                        height="100px"
                        alt="images"
                      />
                    </div>
                    <div className="ca-info">
                      <a href={e.url} target="_blank" rel="noreferrer">
                        <h3>
                          {e.title === null
                            ? `This content have no title click to view more content`
                            : e.title.slice(0, 110)}
                        </h3>
                      </a>
                      <p>
                        By {e.source.name === null ? `Unknown` : e.source.name}{" "}
                        | {e.publishedAt.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* <Contact/> */}
        <Sources />
        <Footer />
      </>
    );
  }
}
