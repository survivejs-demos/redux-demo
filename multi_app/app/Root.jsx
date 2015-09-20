import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Route, Link } from 'react-router';

import Home from './views/Home.jsx';
import Board from './views/Board.jsx';

export default (store) => {
  @DragDropContext(HTML5Backend)
  class Root extends React.Component {
    // XXX: render Home, figure out why routing resets to root
    render() {
      return (
        <div>
          <Provider store={store}>
            <ReduxRouter>
              <Route path="/" component={Board}>
                <Route path=":name" component={Board} />
              </Route>
            </ReduxRouter>
          </Provider>
        </div>
      );
    }
  }

  return Root;
};
