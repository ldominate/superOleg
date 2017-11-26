import * as React from "react";
import * as ReactDOM from "react-dom";
import "core-js/es6/promise";
import "core-js/es6/map";
import "core-js/es6/set";

import { Provider } from "react-redux";
import configureStore from "./store";
import Field from "./components/Field";
import Users from "./components/Users";

if(typeof window.requestAnimationFrame !== "function"){
    window.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(callback, 0);
}

/**
 * То самое место, где качестве initialState ожидают
 * window.__INITIAL_STATE__, но в нашем случае можно передать
 * подходящий объект или пустоту.
 */
const store = configureStore();


const App = () => (
    <Provider store={store}>
        <div>
            <h1>Hello, Redux!</h1>
            <Field placeholder="I like dev tools!" />

            <h3>API Users</h3>
            <Users />
        </div>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);