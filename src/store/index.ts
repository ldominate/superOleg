import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../redux";
import { FieldState } from "../redux/field";
import logger from "../middlewares/logger";

/**
 * Интерфейс хранилища будет использоваться в каждом mapStateToProps,
 * и в остальных местах, где мы напрямую получаем состояние хранилища
 * (например, в асинхронных действиях с redux-thunk)
 */
export interface IStore {
    field: FieldState
}

let composerEnhancers = compose;

// готовим почву для добавления других middleware
const middlewares = [
    logger
];

if(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const configureStore = (initialState?: IStore) => {
    return createStore(
        rootReducer,
        initialState,
        composerEnhancers(
            applyMiddleware(...middlewares)
        )
    )
};

export default configureStore;