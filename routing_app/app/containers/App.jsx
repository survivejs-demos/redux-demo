import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { slide as Menu } from "react-burger-menu";
import Lanes from "../components/Lanes.jsx";
import { createLane } from "../actions/lanes";

class App extends React.Component {
  state = {
    sidebarOpen: false
  };
  render() {
    const { lanes, createLane } = this.props;

    return (
      <div>
        <Menu>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
        </Menu>
        <button
          className="add-lane"
          onClick={createLane.bind(null, {
            name: "New lane"
          })}
        >
          +
        </button>
        <Lanes lanes={lanes} />
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      lanes: state.lanes
    }),
    {
      createLane
    }
  ),
  DragDropContext(HTML5Backend)
)(App);
