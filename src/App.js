import Home from "./components/Home";
import CountryDetails from "./components/CountryDetails";
import Header from "./components/Header";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  useEffect(() => {
    const initialValue = document.body.style.zoom;
    // Changine zoom level on mount for better Look
    document.body.style.zoom = "90%";
    return () => {
      // restoring to default value on unmount
      document.body.style.zoom = initialValue;
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:alpha3Code" component={CountryDetails} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
