const TOGGLE_REFETCH = 'TOGGLE_REFETCH';

// Action creators
export const toggleRefetchAction = () => ({
  type: TOGGLE_REFETCH
});

// Reducers
export const isRefetchReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_REFETCH:
      return !state;
    default:
      return state;
  }
};