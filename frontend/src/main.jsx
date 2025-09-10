import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
// import Routing from './poc/Routing.jsx';
// import Context from './poc/Context.jsx';
// import ThemeManger from './poc/context/themes/ThemeManger.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        {/* <Routing></Routing> */}
        {/* <Context></Context> */}
        {/* <ThemeManger></ThemeManger> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
