import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { IStore } from "../store";

/**
 * В дженерик аргумента store - MiddlewareAPI<S & IStore> - мы добавляем
 * интерфейс нашего хранилища, для возможности обратиться к любому
 * заданному нами состоянию хранилища. Это не обязательно для логгера,
 * но пригодится для middleware с бизнес-логикой.
 */
const logger: Middleware = <S>(store: MiddlewareAPI<S & IStore>) =>
    (next: Dispatch<S>) =>
        // Правильная типизация - <A extends Action>(action: A), обычно слишком многословна.
        (action: any) => {
            // Пример доступа к хранилищу
            store.getState().field.value

            console.log("dispatching", action);
            let result = next(action);
            console.log("next state", store.getState());
            return result;
        };

export default logger;