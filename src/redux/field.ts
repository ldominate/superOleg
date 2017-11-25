/**
 * State
 * Для начала определим интерфейс этого кусочка хранилища,
 * и создадим объект с начальным состоянием.
 */
export interface FieldState {
    value: string;
    focus: boolean;
}

const initialState: FieldState = {
    value: "",
    focus: false
};

/**
 * Constants
 *
 * Каждой константе помимо переменной, необходимо задать тип.
 * Это тянет дополнительную строку кода под константу, но благодаря этому
 * мы можем создавать интерфейсы действий с уникальными типами.
 */
const SET = "field/SET";
type SET = typeof SET;

const FOCUS = "field/FOCUS";
type FOCUS = typeof FOCUS;

const BLUR = "field/BLUR";
type BLUR = typeof BLUR;

/**
 * Actions
 *
 * Используя Redux с TypeScript, достаточно определить интерфейс возможных
 * действий, и определить общий тип (FieldAction) для редьюсера
 */

export interface SetAction {
    type: SET;
    payload: string;
}

export interface FocusAction {
    type: FOCUS;
}

export interface BlurAction {
    type: BLUR;
}

type FieldAction = SetAction | FocusAction | BlurAction;

/**
 * Reducer
 *
 * В редьюсере мы указываем, что получим в качестве аргумента, и
 * вернем один и тот же объект.
 * Аргумент action позволяет проверить только те действия, которые
 * мы добавили в общий тип действий (FieldAction), и благодаря
 * интерфейсам в каждом условном блоке (например case SET) мы знаем
 * точное содержимое аргумента action.
 */
export default function reducer(state: FieldState = initialState, action: FieldAction): FieldState {
    switch(action.type){
        case SET:
            return {
                ...state,
                value: action.payload
            };
        case FOCUS:
            return {
                ...state,
                focus: true
            };
        case BLUR:
            return{
                ...state,
                focus: false
            };
        default:
            return state;
    }
}

/**
 * Action Creators
 *
 * Для отправки действий используются создатели действий,
 * благодаря указанию результата вызова функции как интерфейс
 * конкретного действия, мы не отправим неправильные данные в
 * хранилище.
 */
export const set = (payload: string): SetAction => ({type: SET, payload});

export const focus = (): FocusAction => ({type: FOCUS});

export const blur = (): BlurAction => ({type: BLUR});