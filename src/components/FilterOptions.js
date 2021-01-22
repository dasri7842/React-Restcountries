import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FilterOptions = ({ filterOpt, setFilterOpt }) => {
  const [regOpt, setRegOpt] = useState(["Loading..."]);
  const [langOpt, setLangOpt] = useState(["Loading..."]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=region;languages;")
      .then((res) => {
        let [data, regions, lang] = [res.data, ["All"], ["All"]];
        data.forEach((country) => {
          if (country.region) regions.push(country.region);
          country.languages.forEach((lan) => lang.push(lan.name));
        });
        setRegOpt([...new Set(regions)]);
        setLangOpt([...new Set(lang)]);
      });
  }, []);

  return (
    <div className="mb-4">
      <div className="m-auto">
        <h4>Filter: </h4>
      </div>
      <div className="input-group m-1">
        <div className="input-group-prepend">
          <label className="input-group-text">
            <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
          </label>
        </div>
        <select
          className="form-select"
          name="region"
          value={filterOpt.region}
          onChange={(e) =>
            setFilterOpt({ ...filterOpt, [e.target.name]: e.target.value })
          }
        >
          {regOpt.map((opt) => (
            <option key={uuidv4()} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group m-1">
        <div className="input-group-prepend">
          <label className="input-group-text">
            <i className="fa fa-language fa-2x" aria-hidden="true"></i>
          </label>
        </div>
        <select
          className="form-select"
          name="languages"
          value={filterOpt.languages}
          onChange={(e) =>
            setFilterOpt({ ...filterOpt, [e.target.name]: e.target.value })
          }
        >
          {langOpt.map((opt) => (
            <option key={uuidv4()} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
