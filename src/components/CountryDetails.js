import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CountryDetails = ({ match }) => {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/alpha/${match.params.alpha3Code}`)
      .then((res) => {
        setCountry(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [match]);

  const items = Object.entries(country).map(([key, prop]) => {
    if (
      key === "flag" ||
      key === "regionalBlocs" ||
      key === "translations" ||
      !prop
    )
      return null;
    else if (key === "currencies")
      prop = prop.map((data) => `${data.symbol}-${data.name}`)?.join(", ");
    else if (key === "languages")
      prop = prop.map((data) => `${data.name}-${data.nativeName}`)?.join(", ");
    else if (typeof prop === "object") prop = prop?.join(", ");
    return (
      <div key={uuidv4()} className="row">
        <p className="col-3 text-capitalize text-truncate">{key}</p>
        <strong className="col-9 text-truncate">{prop}</strong>
      </div>
    );
  });

  return (
    <div>
      {loading ? (
        <div className="m-5 text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="row mt-5">
          <div className="col-sm-4">
            <img src={country.flag} className="img-fluid" alt="..."></img>
            <h1 className="display-5 mt-3">{country.name}</h1>
          </div>

          <div className="col-sm-8">{items}</div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
