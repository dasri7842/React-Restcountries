import { useRef, useEffect } from "react";
const SearchField = ({ name, setName }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <div className="input-group m-2">
      <div className="input-group-prepend">
        <label className="input-group-text">
          <i className="fa fa-search fa-3x" aria-hidden="true"></i>
        </label>
      </div>
      <input
        ref={ref}
        type="text"
        value={name}
        className="form-control fs-2"
        autoFocus={true}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
