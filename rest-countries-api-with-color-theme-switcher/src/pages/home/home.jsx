import { useEffect, useState, useRef } from "react";
import Search from "./components/search";
import Body from "./components/body";

function Home() {
  const [data, setData] = useState([]);

  const fullData = useRef([]);
  const fullDataWithRegion = useRef([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const response = await fetch("../../data.json");
      if (!response.ok) throw new Error();
      const fetchedData = await response.json();
      if (!ignore) {
        setData(fetchedData);
        fullData.current = fetchedData;
        fullDataWithRegion.current = fetchedData;
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = region => {
    if (region !== "Filter By Region") {
      fullDataWithRegion.current = fullData.current.filter(
        datum => datum.region === region,
      );
    } else {
      fullDataWithRegion.current = fullData.current;
    }
    setData(fullDataWithRegion.current);
  };

  const handleSubmit = name => {
    if (name) {
      const newData = fullDataWithRegion.current.filter(datum =>
        datum.name.toLowerCase().startsWith(name.toLowerCase()),
      );
      setData(newData);
    } else {
      setData(fullDataWithRegion.current);
    }
  };

  return (
    <>
      <Search
        handleChange={region => handleChange(region)}
        handleSubmit={name => handleSubmit(name)}
      />
      <Body data={data} fullData={fullData.current} />
    </>
  );
}

export default Home;
