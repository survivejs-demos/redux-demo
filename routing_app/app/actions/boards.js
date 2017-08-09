import uuid from "uuid";

export const CREATE_BOARD = "CREATE_BOARD";
export function createBoard(board) {
  return {
    type: CREATE_BOARD,
    board: {
      id: uuid.v4(),
      ...board
    }
  };
}

export const UPDATE_BOARD = "UPDATE_BOARD";
export function updateBoard(updatedBoard) {
  return {
    type: UPDATE_BOARD,
    ...updatedBoard
  };
}

export const DELETE_BOARD = "DELETE_BOARD";
export function deleteBoard(id) {
  return {
    type: DELETE_BOARD,
    id
  };
}
