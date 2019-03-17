import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "../src/SeasonDislpay";

// const App = () => {
//   //Lifecyle-What is happening inside the app
//   window.navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
//   );

//   return <div>Latitude: </div>;
// };

//State is a JS object that contains data relevant to a component
//Updating State on a component causes the component to (almost) instantly re-render
//State must be initialized when a component it first created
//State can ONLY be updated using the FUNCTION setState
class App extends React.Component {
  constructor(props) {
    //very first function that will be called any time an instance of this class is created. Any time we create a new instance of the App component, and show it on the screen, constructor() will be called automatically and instantly before anything else
    super(props);

    //initialize state object (have it include a property called latitude). THIS IS THE ONLY TIME A STATE IS DIRECTLY ASSIGNED
    this.state = { lat: null, errorMessage: "" };
  }

  //ALTERNATE STATE INITIALIZING WITHOUT CONTRUCTOR
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  // componentDidUpdate() {
  //   console.log("My component was just updated - it rerendered! ");
  // }

  render() {
    // YOU DO NOT WANT TO INITIALIZE A CALL IN RENDER METHOD OTHERWISE RENDER WOULD BE CALLED ALL THE TIME. window.navigator.geolocation.getCurrentPosition(
    //   position => console.log(position),
    //   err => console.log(err)
    // );

    //MINIMIZE AMOUNT OF RETURN STATEMENTS IN RENER METHOD
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      //create an instance of season display component
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <div>Loading!</div>;

    //using constructor in render with {this.state.lat}
    //return (
    // <div>
    //   Latitude: {this.state.lat}
    //   <br />
    //   Error: {this.state.errorMessage}
    // </div>
    //);
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
