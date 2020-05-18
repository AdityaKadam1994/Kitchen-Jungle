import { createStore, combineReducers, applyMiddleware } from "redux";
import { recipieReducer } from "./reducers/recipieReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  recipieData: recipieReducer,
});

const store = createStore(
  (state, action) => reducer(state, action),
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
