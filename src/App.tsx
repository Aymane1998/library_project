import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import DictionnaryPage from "./Components/CountriesPage/DictionnaryPage";
function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/dictionnary" element={<DictionnaryPage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App
