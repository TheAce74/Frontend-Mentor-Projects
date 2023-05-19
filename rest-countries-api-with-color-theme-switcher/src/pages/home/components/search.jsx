/* eslint-disable react/prop-types */
import { useRef } from "react";

function Search({ handleChange, handleSubmit }) {
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const handleSubmitting = e => {
    e.preventDefault();
    handleSubmit(inputRef.current.value);
  };

  return (
    <section className="search">
      <form action="" className="search__form" onSubmit={handleSubmitting}>
        <div>
          <button className="search__btn" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            className="search__input"
            type="text"
            placeholder="Search for a country..."
            onInput={handleSubmitting}
            ref={inputRef}
          />
        </div>
        <select
          ref={selectRef}
          value={
            selectRef.current ? selectRef.current.value : "Filter By Region"
          }
          className="search__filter"
          onChange={() => {
            inputRef.current.value = "";
            return handleChange(selectRef.current.value);
          }}
        >
          <option value="Filter By Region">Filter By Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </form>
    </section>
  );
}

export default Search;
