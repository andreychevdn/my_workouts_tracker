import {
  OPEN_CREATION_FORM,
  OPEN_EDITION_FORM,
  SAVE_NEW_WORKOUT,
  SAVE_CHANGED_WORKOUT,
  CANCEL_NEW_WORKOUT,
  CANCEL_CHANGED_WORKOUT,
  OPEN_CREATION_SMALL_FORM,
  CLOSE_CREATION_SMALL_FORM,
  FETCH_WORKOUTS,
  SHOW_WORKOUTS_LIST,
  HIDE_WORKOUTS_LIST,
  DELETE_WORKOUT,
  OPEN_EDITION_SMALL_FORM,
  CLOSE_EDITION_SMALL_FORM,
} from "./constants.js";

const workoutsReducer = (state, { type, payload }) => {
  const stateCopy = { ...state };

  switch (type) {
    case OPEN_CREATION_FORM:
      return {
        ...state,
        creationForm: true,
      };
    case OPEN_EDITION_FORM:
      return {
        ...state,
        editionForm: true,
      };
    case SAVE_NEW_WORKOUT:
      return {
        ...state,
        workouts: [...state.workouts, payload],
      };
    case SAVE_CHANGED_WORKOUT:
      stateCopy.workouts = [...state.workouts];
      let index = stateCopy.workouts.findIndex(
        (workout) => workout.id === payload.id
      );
      stateCopy.workouts[index] = payload;
      return stateCopy;
    case CANCEL_NEW_WORKOUT:
      return {
        ...state,
        creationForm: false,
      };
    case CANCEL_CHANGED_WORKOUT:
      return {
        ...state,
        editionForm: false,
      };
    case OPEN_CREATION_SMALL_FORM:
      return {
        ...state,
        creationSmallForm: true,
      };
    case CLOSE_CREATION_SMALL_FORM:
      return {
        ...state,
        creationSmallForm: false,
      };
    case FETCH_WORKOUTS:
      return {
        ...state,
        workouts: payload,
      };
    case SHOW_WORKOUTS_LIST:
      return {
        ...state,
        workoutsTable: true,
        activeDay: payload,
      };
    case HIDE_WORKOUTS_LIST:
      return {
        ...state,
        workoutsTable: false,
        activeDay: "",
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: [
          ...state.workouts.filter((workout) => workout.id !== payload),
        ],
      };
    case OPEN_EDITION_SMALL_FORM:
      return {
        ...state,
        editionSmallForm: true,
      };
    case CLOSE_EDITION_SMALL_FORM:
      return {
        ...state,
        editionSmallForm: false,
      };
    default:
      return state;
  }
};

export default workoutsReducer;
