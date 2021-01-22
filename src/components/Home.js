import { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import SortBy from "./SortBy";
import FilterOptions from "./FilterOptions";
import SearchField from "./SearchField";
import { v4 as uuidv4 } from "uuid";

// This function Filtersout the date using filterOptions.
const filterOut = (filterOpt, data) => {
  let FilteredData = data.filter((country) => {
    let regionFound =
      filterOpt.region === "All" || country.region === filterOpt.region;
    let langFound = filterOpt.languages === "All";
    country.languages.forEach((lang) =>
      lang.name === filterOpt.languages ? (langFound = true) : null
    );
    return regionFound && langFound;
  });
  return FilteredData;
};

const Home = () => {
  const [data, setData] = useState([]); // Response Data of api.
  const [loading, setLoading] = useState(false); // Loader for Async calls.
  const [name, setName] = useState("in"); // Country Query Name.

  const [filterOpt, setFilterOpt] = useState({
    // Filter Options.
    region: "All",
    languages: "All",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then((res) => {
        setData(filterOut(filterOpt, res.data));
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
      });
  }, [name, filterOpt]);

  const SortByParam = ({ value, order }) => {
    setData([
      ...data.sort((a, b) => (a[value] < b[value] ? -1 * order : 1 * order)),
    ]);
  };

  const CountryCards = data.map((country) => {
    return <CountryCard key={uuidv4()} country={country} />;
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <label className="fs-2 m-1">Find by Country Name: </label>
          <SearchField name={name} setName={setName} />
        </div>
        <div className="col-md-4">
          <FilterOptions filterOpt={filterOpt} setFilterOpt={setFilterOpt} />
        </div>
      </div>
      <hr />
      {!loading ? (
        <div className="">
          <SortBy total={CountryCards.length} SortBy={SortByParam} />
          <div className="CountryCards d-flex flex-wrap justify-content-center align-items-start">
            {CountryCards}
          </div>
        </div>
      ) : (
        <div className="m-5 text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
