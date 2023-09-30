import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayImg from "./images/day.png";
import nightImg from "./images/night.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";
// import required modules
import { Pagination, Navigation } from "swiper";
import WeatherLoader from "./WeatherLoader";
export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDataLocation: "",
      currentDataCondition: "",
      currentData: "",
      data: [],
      city: "nepal",
      loading: true,
    };
  }
  async componentDidMount() {
    this.props.progress(0);
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${this.props.weatherApiKey}&q=${this.state.city}`;
    this.props.progress(50);
    axios
      .get(url)
      .then((Response) => {
        this.props.progress(100);
        this.setState({
          currentDataLocation: Response.data.location,
          currentDataCondition: Response.data.current.condition,
          currentData: Response.data.current,
          data: Response.data.forecast.forecastday[0].hour,
          loading: false,
        });
      })
      .catch((error) => {
        this.props.progress(100);
        console.log(error);
      });
  }

  render() {
    const searchOnClick = async (e) => {
      e.preventDefault();
      this.props.progress(0);
      try {
        let search = document.getElementById("search");
        let urlTwo = `http://api.weatherapi.com/v1/forecast.json?key=${this.props.weatherApiKey}&q=${search.value}`;
        this.props.progress(50);
        let response = await axios.get(urlTwo);
        this.props.progress(100);
        this.setState({
          currentDataLocation: response.data.location,
          currentDataCondition: response.data.current.condition,
          currentData: response.data.current,
          data: response.data.forecast.forecastday[0].hour,
        });
      } catch (error) {
        this.props.progress(100);
        console.log(error);
      }
      let search = document.getElementById('search');
      search.value = "";
    };
    return (
      <>
        <section
          className="weatherMain"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5)), url('${
              this.state.currentData.is_day === 1 ? `${dayImg}` : `${nightImg}`
            }')`,
          }}
        >
          <div className="weatherContainer">
            {this.state.loading === true ? (
              <WeatherLoader />
            ) : (
              <div className="weather-flex-display">
                <div className="weather-item-one">
                  <Link className="backIco" to="/news">
                    <i className="fa-solid fa-arrow-left"></i> Go Back
                  </Link>
                  {/* <div className="search-weather-condition">
                    <form onSubmit={searchOnClick}>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Enter Your country/city"
                      />
                      <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </div> */}
                   <div className="search-weather-condition">
          <form className="form"  onSubmit={searchOnClick}>
            <label htmlFor="search">
              <input
                className="input"
                type="text"
                placeholder="Enter Your Place"
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
                  <h1>
                    {this.state.currentDataLocation.name},{" "}
                    {this.state.currentDataLocation.country}
                  </h1>
                  <div className="fl-dis-weather">
                    <div className="it-one it">
                      <img
                        src={this.state.currentDataCondition.icon}
                        alt="disc"
                      />
                      <h2>{this.state.currentDataCondition.text}</h2>
                      <p>
                        {this.state.currentData.is_day === 1 ? `Day` : `Night`}{" "}
                        Time / {this.state.currentDataLocation.localtime}
                      </p>
                    </div>
                    <div className="it-two it">
                      <h4>{this.state.currentData.temp_c}°C</h4>
                      <p>
                        {this.state.currentData.temp_c}°C /{" "}
                        <span>{this.state.currentData.temp_f}°F</span>
                      </p>
                    </div>
                    <div className="it-three it">
                      <h4>
                        Precipitation: {this.state.currentData.precip_mm}%
                      </h4>
                      <h4>Wind: {this.state.currentData.wind_mph} MPH</h4>
                      <h4>Humidity: {this.state.currentData.humidity}%</h4>
                    </div>
                  </div>
                </div>
                <div className="weather-item-two">
                  <div className="weather-flex-display-two">
                    <div className="it-of-fd">
                      <Swiper
                        slidesPerView={7}
                        spaceBetween={10}
                        slidesPerGroup={1}
                        // loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                      >
                        {this.state.data.map((e) => {
                          return (
                            <SwiperSlide>
                              <img src={e.condition.icon} alt="icons" />
                              <h1 className="status">{e.condition.text}</h1>
                              {/* <h2>{e.time.slice(10,16)} PM</h2> */}
                              <h2>
                                {e.time.slice(11, 13) > 12
                                  ? `${e.time.slice(11, 16)} PM`
                                  : `${e.time.slice(11, 16)} AM`}
                              </h2>
                              <h3>
                                {e.temp_c}°C / {e.temp_f}°F
                              </h3>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
}
