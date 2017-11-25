import { createStore } from "redux";
import rootReducer from "../redux";
import { FieldState } from "../redux/field";

/**
 * Интерфейс хранилища будет использоваться в каждом mapStateToProps,
 * и в остальных местах, где мы напрямую получаем состояние хранилища
 * (например, в асинхронных действиях с redux-thunk)
 */
export interface IStore {
    field: FieldState
}

const configureStore = (initialState?: IStore) => {
    return createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
};

export default configureStore;