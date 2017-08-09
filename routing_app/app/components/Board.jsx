import React from "react";
import { connect } from "react-redux";
import Lanes from "./Lanes.jsx";
import { createLane } from "../actions/lanes";

// TODO: connect created lanes with boards here
const Board = ({ board: { name, lanes }, createLane }) => {
  return (
    <div className="board">
      <div>
        {name}
      </div>
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
};

export default connect(
  state => ({
    board: state.boards.filter(board => board.id === state.selectedBoardId)
  }),
  {
    createLane
  }
)(Board);
