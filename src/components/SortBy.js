import { useState } from "react";

const SortBy = ({ total, SortBy }) => {
  const [sortProp, setSortProp] = useState({ order: 1, value: "name" }); // 1 -> Asceding order, -1 -> des order.

  return (
    <div className="my-4 row bg-light py-2">
      <div className="col-md-4 text-center my-auto">
        <h1>
          Found <span className="badge bg-info">{total}</span>
        </h1>
      </div>
      <div className="col-md-6">
        <div className="input-group my-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Sort By</label>
          </div>
          <select
            className="form-select"
            onChange={(e) => {
              setSortProp({ ...sortProp, value: e.target.value });
              SortBy({ ...sortProp, value: e.target.value });
            }}
          >
            <option value="name">Country Name</option>
            <option value="capital">Capital Name</option>
            <option value="area">Area</option>
            <option value="population">Population</option>
          </select>
          <div className="form-check form-switch m-auto">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => {
                setSortProp({ ...sortProp, order: -1 * sortProp.order });
                SortBy({ ...sortProp, order: -1 * sortProp.order });
              }}
            />
            <label className="form-check-label">
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
