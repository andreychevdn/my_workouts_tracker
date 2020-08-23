import {
    OPEN_CREATION_FORM,
    SAVE_NEW_WORKOUT,
    CANCEL_NEW_WORKOUT, 
    OPEN_ADDITION_FORM,
    CLOSE_ADDITION_FORM, 
} from './constants.js';

const workoutsReducer = (state, {type, payload}) => {

    switch (type) {
        case OPEN_CREATION_FORM:
            return {
                ...state,
                creationForm: true
              };
        case SAVE_NEW_WORKOUT:
            return;
        case CANCEL_NEW_WORKOUT:
            return {
                ...state,
                creationForm: false
              };
        case OPEN_ADDITION_FORM:
            return {
                ...state,
                additionForm: true
            };
        case CLOSE_ADDITION_FORM:
            return {
                ...state,
                additionForm: false
            };
        default:
            return state;
    }
};

export default workoutsReducer;
