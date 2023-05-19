import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import RouteComponent from "./config/RouteComponent";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <RouteComponent />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
