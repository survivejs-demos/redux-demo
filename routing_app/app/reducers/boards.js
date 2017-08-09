import * as types from "../actions/boards";

const initialState = [];

export default function boards(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_BOARD:
      return [...state, action.board];

    case types.UPDATE_BOARD:
      return state.map(board => {
        if (board.id === action.id) {
          const { type, ...updatedBoard } = action;
          return Object.assign({}, note, updatedBoard);
        }

        return note;
      });

    case types.DELETE_BOARD:
      return state.filter(board => board.id !== action.id);

    default:
      return state;
  }
}
