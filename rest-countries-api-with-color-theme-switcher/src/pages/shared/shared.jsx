import { Outlet } from "react-router-dom";
import Header from "./components/header";

function Shared() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Shared;
