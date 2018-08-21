import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import './reset.css';
import './App.css';

const apiKey = "50dbb3d44720ee3f93e06f49bc35222f";

class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiKey}`);
    const data = await apiCall.json();
    if (city && country) {
      console.log(data);
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please select another location."
      })
    }
  }

  render (){
    return (
      <div className="wrapper">
        <div className="main">
          <div className="titles">
            <Titles />
          </div>
          <div className="form">
            <div className="form__text">
              <Form getWeather={this.getWeather}/>
              <Weather
                city={this.state.city}
                country={this.state.country}
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
