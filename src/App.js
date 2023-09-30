import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import News from "./components/News";
import logo from "./images/logo.png";
import Category from "./components/Category";
import Contact from "./components/Contact";
import Weather from "./components/Weather";
import About from "./components/About";
import LoadingBar from "react-top-loading-bar";
class App extends Component {
  apiKey = process.env.REACT_APP_NEWSAPI;
  weatherApiKey = process.env.REACT_APP_WEATHERAPI;
  state = {
    progress: 0,
    loader: true,
  };
  progressBar = (progress) => {
    this.setState({
      progress: progress,
    });
  };
  componentDidMount() {
    this.setState({
      loader: false,
    });
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <LoadingBar
            color="#29a19c"
            progress={this.state.progress}
            height="7px"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="news"
              element={
                <News
                  url={logo}
                  progress={this.progressBar}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="weather"
              element={
                <Weather
                  progress={this.progressBar}
                  weatherApiKey={this.weatherApiKey}
                />
              }
            />
            <Route
              path="category"
              element={
                <Category progress={this.progressBar} apiKey={this.apiKey} />
              }
            />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
export default App;