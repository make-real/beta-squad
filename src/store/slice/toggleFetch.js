const TOGGLE = 'TOGGLE';

// Define action creators
export const toggleAction = () => ({
  type: TOGGLE
});

// Define initial state
const initialState = {
  value: false
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        value: !state.value
      };
    default:
      return state;
  }
};

// Export reducer directly
export default reducer;