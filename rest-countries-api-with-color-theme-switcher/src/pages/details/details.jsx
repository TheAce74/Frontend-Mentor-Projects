import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Details() {
  const { state } = useLocation();
  const [country, setCountry] = useState(state);
  const data = useRef([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const response = await fetch("../../data.json");
      if (!response.ok) throw new Error();
      const fetchedData = await response.json();
      if (!ignore) {
        data.current = fetchedData;
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChangeCountry = value => {
    const requiredData = data.current.filter(item => item.name === value);
    const info = {
      url: requiredData[0].flags.svg,
      name: requiredData[0].name,
      population: requiredData[0].population,
      region: requiredData[0].region,
      nativeName: requiredData[0].nativeName,
      subregion: requiredData[0].subregion,
      capital: requiredData[0].capital,
      topLevelDomain: requiredData[0].topLevelDomain,
      currencies: requiredData[0].currencies,
      languages: requiredData[0].languages,
      borders: data.current
        .filter(elem =>
          (requiredData[0]?.borders || ["No border countries"]).includes(
            elem.alpha3Code,
          ),
        )
        .map(elem => elem.name),
    };
    setCountry(info);
  };
  return (
    <div className="details">
      <Link to="/" className="details__back" title="Back to home">
        <i className="fa-solid fa-arrow-left-long"></i>
        <span>Back</span>
      </Link>

      <section className="details__section">
        <img
          src={country.url}
          alt={`${country.name} flag`}
          className="details__img"
        />
        <div className="details__content">
          <h2 className="details__heading">{country.name}</h2>
          <div className="details__inner-content">
            <div>
              <p>
                <b>Native Name: </b>
                {country.nativeName}
              </p>
              <p>
                <b>Population: </b>
                {country.population}
              </p>
              <p>
                <b>Region: </b>
                {country.region}
              </p>
              <p>
                <b>Sub Region: </b>
                {country.subregion}
              </p>
              <p>
                <b>Capital: </b>
                {country.capital}
              </p>
            </div>
            <div>
              <p>
                <b>Top Level Domain: </b>
                {country.topLevelDomain[0]}
              </p>
              <p>
                <b>Currencies: </b>
                {country.currencies.length === 1
                  ? country.currencies[0].name
                  : country.currencies
                      .reduce((string, elem) => `${string}, ${elem.name}`, "")
                      .slice(2)}
              </p>
              <p>
                <b>Languages: </b>
                {country.languages.length === 1
                  ? country.languages[0].name
                  : country.languages
                      .reduce((string, elem) => `${string}, ${elem.name}`, "")
                      .slice(2)}
              </p>
            </div>
          </div>
          <div className="details__borders">
            <p>
              <b>Border Countries: </b>
            </p>
            <div>
              {country.borders.length <= 1 ? (
                country.borders.length === 0 ? (
                  <p>No border countries</p>
                ) : (
                  <button
                    className="details__border"
                    onClick={() => handleChangeCountry(country.borders[0])}
                  >
                    {country.borders[0]}
                  </button>
                )
              ) : (
                country.borders.map(border => (
                  <button
                    className="details__border"
                    key={border}
                    onClick={() => handleChangeCountry(border)}
                  >
                    {border}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Details;
