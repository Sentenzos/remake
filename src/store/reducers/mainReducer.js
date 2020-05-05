const SET_SERVER_ERROR = "mainReducer/SET_SERVER_ERROR";
const UNSET_SERVER_ERROR = "mainReducer/UNSET_SERVER_ERROR";
const TOGGLE_IS_PROCESSING = "mainReducer/IS_PROCESSING";
const TOGGLE_IS_INITIALIZING = "mainReducer/TOGGLE_IS_INITIALIZING";

const initialState = {
  serverError: {
    message: "",
    state: false
  },
  isInitializing: false,
  isProcessing: false,
};


export const mainReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_SERVER_ERROR:
      return {
        ...state,
        serverError: {
          message: action.message,
          state: true
        }
      };

    case UNSET_SERVER_ERROR:
      return {
        ...state,
        serverError: {
          ...state.serverError,
          state: false
        }
      };

    case TOGGLE_IS_PROCESSING:
      return {
        ...state,
        isProcessing: action.state
      };

    case TOGGLE_IS_INITIALIZING:
      return {
        ...state,
        isInitializing: action.state
      };

    default:
      return state
  }
};


export const setServerError = (message) => ({type: SET_SERVER_ERROR, message});
export const unsetServerError = () => ({type: UNSET_SERVER_ERROR});
export const toggleIsProcessing = (state) => ({type: TOGGLE_IS_PROCESSING, state});
export const toggleIsInitializing = (state) => ({type: TOGGLE_IS_INITIALIZING, state});
