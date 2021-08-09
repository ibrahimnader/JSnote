import "bulmaswatch/journal/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AddCell } from "./components/AddCell";
import { CellsList } from "./components/CellsList";
import { store } from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellsList />
        <AddCell />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
