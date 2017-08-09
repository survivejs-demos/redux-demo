import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { slide as Menu } from "react-burger-menu";
import Board from "../components/Board.jsx";
import { createBoard } from "../actions/boards";

class App extends React.Component {
  /*state = {
    sidebarOpen: false
  };*/
  render() {
    const { boards, selectedBoard, createBoard } = this.props;

    console.log(boards, selectedBoard);

    /*
<a id="home" className="menu-item" href="/">
  Home
</a>
 */

    // TODO: edit board name + delete board
    // TODO: select board
    return (
      <div>
        <Menu>
          <button
            className="add-board"
            onClick={createBoard.bind(null, {
              name: "New board"
            })}
          >
            +
          </button>
          <ul>
            {boards.map(board =>
              <li key={board.id}>
                {board.name}
              </li>
            )}
          </ul>
        </Menu>
        <Board board={selectedBoard} />
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      boards: state.boards,
      selectedBoardId: state.selectedBoardId,
      selectedBoard: state.boards.filter(
        board => board.id === state.selectedBoardId
      )
    }),
    {
      createBoard
    }
  ),
  DragDropContext(HTML5Backend)
)(App);
