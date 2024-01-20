const initialState = {
    header: {}, // Define your initial header state structure
    details: [], // Define your initial details state structure
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_HEADER':
        return { ...state, header: action.payload };
      case 'UPDATE_DETAILS':
        return { ...state, details: action.payload };
      default:
        return state;
    }
  };
  
  export default formReducer;