import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "./store";
import Field from "./components/Field";

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
        </div>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);