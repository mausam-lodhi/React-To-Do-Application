import { combineReducers } from 'redux';
import authReducer from './authSlice';
import todoReducer from './todoSlice';

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
});
