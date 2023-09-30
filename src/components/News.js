import React, { Component } from "react";
import Nevbar from "./Nevbar";
import axios from "axios";
import errors from "./images/error.png";
import errorTwo from "./images/errorTwo.png";
import Contact from "./Contact";
import Scroll from "./Scroll";
import Sources from "./Sources";
import Loader from "./Loader";
import noresult from "./images/noresult.png";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      values: "",
      shortBy: "",
      dataTwo: [],
      nextPrev: 1,
      totalResults: 0,
      trending: [],
      loading: true,
      publishDate: "",
      greeting: "",
      host: "http://127.0.0.1:5000",
    };
  }
  async newsComponent() {
    try {
      // let date = new Date();
      this.props.progress(0);
      // let dateTime = `${date.getFullYear()}-${
      //   date.getMonth() + 1
      // }-${date.getDate()}`;
      this.setState({ loading: true });
      let selec = document.getElementById("Select");
      let pdate = document.getElementById("date");
      this.props.progress(50);

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        search: `${
          this.state.values.length === 0 ? "planet" : this.state.values
        }`,
        from: pdate.value,
        sortBy: this.state.shortBy,
        apiKey: this.props.apiKey,
        page: this.state.nextPrev,
      });

      let response = await fetch(`${this.state.host}/apiThree`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let resSearch = await response.json();
      this.props.progress(100);
      this.setState({
        dataTwo: resSearch.articles,
        totalResults: resSearch.totalResults,
        shortBy: selec.value,
        loading: false,
        publishDate: pdate.value,
      });
      if (resSearch.totalResults === 0) {
        let gridDisplay = document.querySelector(".grid-display");
        gridDisplay.style.backgroundImage = `url(${noresult})`;
      } else {
        let gridDisplay = document.querySelector(".grid-display");
        gridDisplay.style.backgroundImage = `none`;
      }
    } catch (error) {
      this.props.progress(100);
      console.log(error);
    }
  }
  async componentDidMount() {
    let date = new Date();
    let hours = date.getHours();
    let status =
      hours < 12
        ? "Good Morning!"
        : hours <= 18 && hours >= 12
        ? "Good Afternoon!"
        : "Good Night!";
    this.setState({
      greeting: status,
    });
    let dateTime = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    this.props.progress(0);
    // let url = `https://newsapi.org/v2/everything?q=planet&from=${dateTime}&sortBy=${this.state.shortBy}&pageSize=8&language=en&page=${this.state.nextPrev}`;
    this.setState({ loading: true });
    this.props.progress(50);
    // let bodyContent = JSON.stringify({
    //   "search":"planet",
    //   "from":dateTime,
    //   "sortBy":this.state.shortBy,
    //   // "apiKey":this.props.apiKey,
    //   "page": this.state.nextPrev
    // });
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        search: "planet",
        from: dateTime,
        sortBy: this.state.shortBy,
        page: this.state.nextPrev,
      });

      let response = await fetch(`${this.state.host}/api`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      //  console.log(data.articles.length)
      this.props.progress(100);
      let selec = document.getElementById("Select");
      this.setState({
        loading: false,
        dataTwo: data.articles,
        totalResults: data.totalResults,
        shortBy: selec.value,
        publishDate: dateTime,
      });
    } catch (err) {
      this.props.progress(100);
      let gridDis = document.querySelector(".grid-display");
      gridDis.style.backgroundImage = `url("${errorTwo}")`;
      gridDis.style.backgroundPosition = "center";
      gridDis.style.backgroundSize = "cover";
      gridDis.style.borderRadius = "5px";
      this.setState({
        loading: false,
      });
    }

    axios
      .get(`${this.state.host}/apiTwo`, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": `${this.props.apiKey}`,
        },
      })
      .then((response) => {
        this.setState({
          data: response.data.articles,
        });
      })
      .catch((error) => {
        let flexDis = document.querySelector(".flex-display");
        flexDis.style.backgroundImage = `url("${errors}")`;
        flexDis.style.backgroundPosition = "center";
        flexDis.style.backgroundSize = "cover";
        flexDis.style.borderRadius = "5px";

        let gridDisTwo = document.querySelector(".grid-display-two");
        gridDisTwo.style.backgroundImage = `url("${errors}")`;
        gridDisTwo.style.backgroundPosition = "center";
        gridDisTwo.style.backgroundSize = "cover";
        gridDisTwo.style.borderRadius = "5px";
      });
  }

  render() {
    const onchangeVal = (event) => {
      this.setState({
        values: event.target.value,
      });
    };
    const onclick = async (e) => {
      e.preventDefault();
      this.newsComponent();
      let containerTwo = document.querySelector(".containerTwo");
      containerTwo.scrollIntoView({ behavior: "smooth" });
    };
    const prevOnClick = async () => {
      this.setState({
        nextPrev: this.state.nextPrev - 1,
      });
      this.newsComponent();
    };
    const nextOnClick = async () => {
      this.setState({
        nextPrev: this.state.nextPrev + 1,
      });
      this.newsComponent();
    };
    const { url } = this.props;
    return (
      <>
        <div className="news">
          <Nevbar
            url={url}
            onchangeVal={onchangeVal}
            inpValue={this.state.values}
            onSubmitVal={onclick}
            id="Select"
            idInp="date"
          />
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {this.state.data.map((element) => {
              return (
                <SwiperSlide
                  key={element.url}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)),
                  url(${
                    element.urlToImage === null ||
                    element.urlToImage.status === 403
                      ? `https://cdn.dribbble.com/users/88213/screenshots/8560585/media/7263b7aaa8077a322b0f12a7cd7c7404.png?compress=1&resize=400x300`
                      : element.urlToImage
                  })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "none",
                  }}
                >
                  <section className="header">
                    <div className="headingSesc">
                      <a href={element.url} target="_blank" rel="noreferrer">
                        <h1>
                          {element.title}
                          {/* {this.state.greeting} */}
                        </h1>
                      </a>
                      <h3>
                        {element.description}
                        {/* {this.state.greeting === "Good Morning!"
                        ? "Start Your Morning with coffee and news"
                        : this.state.greeting === "Good Afternoon!"
                        ? "Explore all afternoon news"
                        : "Read Latest news before sleeping"} */}
                      </h3>
                    </div>
                    {/* {(this.state.loading===true)?<Loader/>:this.state.loading} */}
                    <Scroll />
                  </section>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <section className="containerOne">
            <h1>Latest News About Technology</h1>
            <h4>
              Any sufficiently advanced technology is indistinguishable from
              magic
            </h4>
            <div className="recCard">
              <div className="flex-display">
                {this.state.data.slice(0, 2).map((element) => {
                  return (
                    <div
                      className="items"
                      key={element.url}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.2)), url(${element.urlToImage})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <h2>
                        {element.author === null
                          ? `Unknown`
                          : element.author.toUpperCase()}
                      </h2>
                      <p>{element.title}</p>
                      <a href={element.url}>
                        <button className="learn-more">
                          <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                          </span>
                          <span className="button-text">Learn More</span>
                        </button>
                      </a>
                      {/* <a href={element.url}>
                        Learn More <i className="fa-solid fa-angles-right"></i>
                      </a> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="containerTwo">
            <h1>Your Searched News</h1>
            <h4>
              Total <span>{this.state.totalResults}</span> Results{" "}
              <span>
                {this.state.values.length === 0
                  ? ""
                  : `for ${this.state.values.toUpperCase()}`}
              </span>
            </h4>
            {this.state.dataTwo.slice(0, 1).map((date) => {
              return (
                <h5 style={{ color: "white" }} key={date.url}>
                  Published Date: {date.publishedAt.slice(0, 10)}
                </h5>
              );
            })}
            <div className="grid-display">
              <h1>{this.state.errors}</h1>
              {this.state.dataTwo.map((elems) => {
                return this.state.loading === true ? (
                  <Loader key={elems.url} />
                ) : (
                  <div className="cards" key={elems.url}>
                    {/* <h4>{elems.publishedAt.slice(0, 10)}</h4> */}
                    <h4>
                      {this.state.publishDate === elems.publishedAt.slice(0, 10)
                        ? `Latest News`
                        : `Popular`}
                    </h4>
                    <img
                      src={
                        elems.urlToImage === null ||
                        elems.urlToImage.status === 403
                          ? `https://cdn.dribbble.com/users/88213/screenshots/8560585/media/7263b7aaa8077a322b0f12a7cd7c7404.png?compress=1&resize=400x300`
                          : elems.urlToImage
                      }
                      alt="imgs"
                    />
                    <h3>
                      {/* {(elems.title===null)?`No Title`:elems.title} */}
                      {elems.title === null
                        ? "No title for this content click learn more to read"
                        : elems.title.length > 70
                        ? elems.title.slice(0, 70) + "..."
                        : elems.title}
                    </h3>
                    <p>
                      {elems.description === null
                        ? `This content doesnt have any discription`
                        : elems.description.length > 240
                        ? elems.description.slice(0, 240) + "..."
                        : elems.description.length < 240
                        ? elems.description +
                          " .If you want to learn more click button below, for the more update subscribe our website and share with others to help them read latest news"
                        : elems.description}
                      {/* {(elems.description===null)?`No Discription`:elems.description} */}
                    </p>
                    <a href={elems.url}>
                      <button>
                        Learn More <i className="fa-solid fa-angle-right"></i>
                      </button>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="btns">
            <button
              className="btn"
              disabled={this.state.nextPrev <= 1}
              onClick={prevOnClick}
            >
              <i className="fa-solid fa-angle-left"></i>{" "}
              <span className="nextPrevBtn">Previous</span>
            </button>
            <h1
              style={{
                fontWeight: "400",
              }}
            >
              Page {this.state.nextPrev}
            </h1>
            <button
              className="btn"
              disabled={Math.trunc(
                this.state.nextPrev + 1 > this.state.totalResults / 12
              )}
              onClick={nextOnClick}
            >
              <span className="nextPrevBtn">Next </span>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </section>
          <section className="containerThree">
            <h1>Trending Now</h1>
            <h4>Today's most trending news</h4>
            <div className="grid-display-two">
              {this.state.data.slice(7, 8).map((element) => {
                return (
                  <div
                    key={element.url}
                    className="allItem one"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.2)), url(${element.urlToImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <h2>
                      {element.author === null
                        ? `Unknown`
                        : element.author.toUpperCase()}
                    </h2>
                    <p>{element.title}</p>
                    <a href={element.url}>
                      Learn More <i className="fa-solid fa-angles-right"></i>
                    </a>
                  </div>
                );
              })}
              {this.state.data.slice(4, 5).map((element) => {
                return (
                  <div
                    key={element.url}
                    className="allItem two"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.2)), url(${element.urlToImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <h2>
                      {element.author === null
                        ? `Unknown`
                        : element.author.toUpperCase()}
                    </h2>
                    <p>{element.title}</p>
                    <a href={element.url}>
                      Learn More <i className="fa-solid fa-angles-right"></i>
                    </a>
                  </div>
                );
              })}
              {this.state.data.slice(5, 6).map((element) => {
                return (
                  <div
                    key={element.url}
                    className="allItem three"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.2)), url(${element.urlToImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <h2>
                      {element.author === null
                        ? `Unknown`
                        : element.author.toUpperCase()}
                    </h2>
                    <p>{element.title}</p>
                    <a href={element.url}>
                      Learn More <i className="fa-solid fa-angles-right"></i>
                    </a>
                  </div>
                );
              })}
              {this.state.data.slice(6, 7).map((element) => {
                return (
                  <div
                    key={element.url}
                    className="allItem four"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.2)), url(${element.urlToImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <h2>
                      {element.author === null
                        ? `Unknown`
                        : element.author.toUpperCase()}
                    </h2>
                    <p>{element.title}</p>
                    <a href={element.url}>
                      Learn More <i className="fa-solid fa-angles-right"></i>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
          <Sources />
          <Contact />
        </div>
      </>
    );
  }
}
