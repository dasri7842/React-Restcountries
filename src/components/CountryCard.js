import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const LiClassName = "list-group-item text-truncate";
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <h5 className="card-header list-group-item-primary">{country.name}</h5>
      <div>
        <img src={country.flag} className="card-img-top p-1" alt={"..."} />
        <ul className="list-group list-group-flush">
          <li className={LiClassName}>
            Capital : <strong>{country.capital}</strong>
          </li>
          <li className={LiClassName}>
            Population : <strong>{country.population}</strong>
          </li>
          <li className={LiClassName}>
            Area : <strong>{country.area}</strong>
          </li>
          <li className={LiClassName}>
            Language :<strong>{country.languages[0].name}</strong>
          </li>
          <li className={LiClassName}>
            Currency :
            <strong>{` ${country.currencies[0].symbol}  ${country.currencies[0].name}`}</strong>
          </li>
          <li className="list-group-item text-center">
            <Link to={`/${country.alpha3Code}`}>Country Details</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountryCard;
