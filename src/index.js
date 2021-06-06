import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";

import App from "./components/App";
import "./index.css"
import rootReducer from "./reducers";

const thunk = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
        action(dispatch);
        return
    }
    next(action)
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export const StoreContext = createContext();

class Provider extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <StoreContext.Provider value={store}>
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"));
