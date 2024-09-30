import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountriesPage from "./Components/CountriesPage/CountriesPage";
import CountryDetailPage from "./Components/CountryDetailPage/CountryDetailPage";
import { store } from "./store/store";
import { Provider } from "react-redux";
function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/country/:id" element={<CountryDetailPage />} />
        </Routes>
      </Router>
    </Provider>
      
    </>
  );
}

export default App
