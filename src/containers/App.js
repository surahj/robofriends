import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundary from "./ErrorBoundary";
import LoadingIcon from "../components/LoadingIcon";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));

    console.log("componetDidMount");
  }

  onSearchChanges = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filterRobots = robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(searchfield.toLowerCase());
    });
    return (
      (!robots.length) ?
      <div>
          <h1> Loding...</h1>
          {<LoadingIcon />}
      </div>:
      <div>
        <h1 className="f1"> RobotFriends </h1>
        <SearchBox searchChanges={this.onSearchChanges} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filterRobots} />
            </ErrorBoundary>
          </Scroll>
      </div>
    )
  }
}

export default App;
