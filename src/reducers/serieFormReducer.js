import { SET_FIELD, SERIE_SAVED_SUCESS, SET_WHOLE_SERIE, RESET_FORM, } from '../actions';


const INITIAL_STATE = {
    id: null,
    title: "",
    gender: "acao",
    rate: 0,
    img64: "",
    description: ""
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_FIELD:
            const newState = { ...state };
            newState[action.field] = action.value;
            return newState;
        case SET_WHOLE_SERIE:
            return action.serie;
        case SERIE_SAVED_SUCESS:
            return INITIAL_STATE;
        case RESET_FORM:
            return INITIAL_STATE;        
        default:
            return state;
    }
}