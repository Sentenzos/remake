const RESET_ADD_WORD = "reduxFormReducer/RESET_ADD_WOR";

export const reduxFormReducer = {
  "addWord": (state, action) => {
    switch (action.type) {
      case RESET_ADD_WORD:
        return undefined;
      default:
        return state
    }
  }
};


export const resetAddWord = () => ({type: RESET_ADD_WORD});



