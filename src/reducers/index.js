import { combineReducers } from 'redux';
import formReducer from './formReducer'; // Create this file

const rootReducer = combineReducers({
  form: formReducer,
  // Add other reducers if needed
});

export default rootReducer;