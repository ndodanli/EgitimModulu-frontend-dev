import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { LOCATION_CHANGE, routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";
import { getUpdatedStoreValues } from "../utilities/redux/updatedStoreValues";

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== LOCATION_CHANGE) {
    return rootReducer(state, action);
  }
  const newRootReducer = rootReducer(getUpdatedStoreValues(state), action);
  return newRootReducer;
};

export default function configureStore(initialState) {
  const store = createStore(
    resetEnhancer(createRootReducer(history)), // router state ile root reducer
    initialState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history), // history action'larını dispatch etmek için
        thunk //asenkron işlemlerin sağlanması(action fonksiyonları için)
      )
    )
  );
  return store;
}
