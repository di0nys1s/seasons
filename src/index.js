import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// state is a js object that contains data relevant to a component.
// state can only be updated using the function 'setState'.
// state should be initialized when the application starts. done via constructor
// class based component
class App extends React.Component {
    // state initialization
    state = { lat: null, errorMessage: '' };

    // data loading
    componentDidMount() {
            window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err =>  this.setState({ errorMessage: err.message })         
            );
    }

    /*
    componentDidMount() {
        console.log('My component was rendered to the screen');
    }

    componentDidUpdate() {
        console.log('My component was just updated = it rerendered!')
    }
    */

    renderContent() {
    if(this.state.errorMessage && !this.state.lat) {
        return <div>Error: {this.state.errorMessage}</div>;
    } 

    if (!this.state.errorMessage && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner />;
  }

  // React says we have to define render!! in render method is only for returning JSX.
  render() {
      return (
        <div className="border red">
            {this.renderContent()}
        </div>
 
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
