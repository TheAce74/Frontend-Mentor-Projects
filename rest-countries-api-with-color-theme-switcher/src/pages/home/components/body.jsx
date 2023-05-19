/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Body({ data, fullData }) {
  const fadeRef = useRef("true");

  const changeFadeRef = () => (fadeRef.current = "false");

  return (
    <section className="body">
      {data.length !== 0 ? (
        data.map(datum => {
          // getting border countries names
          const bordersArr = datum.borders
            ? [...datum.borders]
            : ["No border countries"];
          const borderCountries = fullData.filter(elem =>
            bordersArr.includes(elem.alpha3Code),
          );
          const borders = borderCountries.map(elem => elem.name);
          return (
            <Card
              key={datum.numericCode}
              url={datum.flags.svg}
              name={datum.name}
              population={datum.population}
              region={datum.region}
              capital={datum.capital}
              fadeRef={fadeRef}
              changeFadeRef={changeFadeRef}
              nativeName={datum.nativeName}
              subregion={datum.subregion}
              topLevelDomain={datum.topLevelDomain}
              currencies={datum.currencies}
              languages={datum.languages}
              borders={borders}
            />
          );
        })
      ) : (
        <p className="splash">
          <span>Nothing to see here </span>
          <i className="fa-solid fa-face-dizzy"></i>
        </p>
      )}
    </section>
  );
}

function Card({
  url,
  name,
  population,
  region,
  capital,
  fadeRef,
  changeFadeRef,
  nativeName,
  subregion,
  topLevelDomain,
  currencies,
  languages,
  borders,
}) {
  //the info object holds data to be passed to the details page so as to improve UX
  const info = {
    url: url,
    name: name,
    population: population,
    region: region,
    nativeName: nativeName,
    subregion: subregion,
    capital: capital,
    topLevelDomain: topLevelDomain,
    currencies: currencies,
    languages: languages,
    borders: borders,
  };

  useEffect(() => {
    changeFadeRef();
  }, []);

  return (
    <Link
      to="details"
      state={info}
      className="body__card"
      data-fade={fadeRef.current}
    >
      <img src={url} alt={`${name} flag`} className="body__img" />
      <div className="body__wrapper">
        <h2 className="body__name">{name}</h2>
        <p className="body__population">
          <b>Population:</b> {population}
        </p>
        <p className="body__region">
          <b>Region:</b> {region}
        </p>
        <p className="body__capital">
          <b>Capital:</b> {capital}
        </p>
      </div>
    </Link>
  );
}

export default Body;
