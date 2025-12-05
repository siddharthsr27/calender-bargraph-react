import { createStore } from "redux";
import dataReducer from "./dataSlice";

const store = createStore(
  dataReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
