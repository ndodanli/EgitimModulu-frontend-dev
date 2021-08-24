import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./redux_config/configureStore";
import App from "./App";
import * as serviceWorker from "./registerServiceWorker";
import { initialStoreValues } from "./utilities/redux/initialStoreValues";
import { icons } from "./assets/icons";
React.icons = icons;
const rootElement = document.getElementById("root");

const store = configureStore(initialStoreValues); //store'un initial değeri
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
