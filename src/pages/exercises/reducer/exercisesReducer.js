import {
  FETCH_EXERCISES,
  OPEN_CREATION_FORM,
  SAVE_NEW_EXERCISE,
  CANCEL_NEW_EXERCISE,
  OPEN_EDITION_FORM,
  SAVE_CHANGED_EXERCISE,
  CANCEL_CHANGED_EXERCISE,
  DUPLICATE_EXERCISE,
  DELETE_EXERCISE,
} from "./constants.js";

const exercisesReducer = (state, { type, payload }) => {
  const stateCopy = { ...state };
  switch (type) {
    case FETCH_EXERCISES:
      return {
        ...state,
        exercises: payload,
      };
    case OPEN_CREATION_FORM:
      return {
        ...state,
        creationForm: true,
      };
    case SAVE_NEW_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, payload],
      };
    case CANCEL_NEW_EXERCISE:
      return {
        ...state,
        creationForm: false,
      };
    case OPEN_EDITION_FORM:
      return {
        ...state,
        editionForm: true,
      };
    case SAVE_CHANGED_EXERCISE:
      stateCopy.exercises = [...state.exercises];
      let index = stateCopy.exercises.findIndex(
        (exercise) => exercise.id === payload.id
      );
      stateCopy.exercises[index] = payload;
      return stateCopy;
    case CANCEL_CHANGED_EXERCISE:
      return {
        ...state,
        editionForm: false,
      };
    case DUPLICATE_EXERCISE:
      return { ...state, exercises: [...state.exercises, payload] };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: [
          ...state.exercises.filter((exercise) => exercise.id !== payload),
        ],
      };
    default:
      return state;
  }
};

export default exercisesReducer;
