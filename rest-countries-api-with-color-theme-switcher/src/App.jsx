import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shared from "./pages/shared/shared";
import Home from "./pages/home/home";
import Details from "./pages/details/details";
import Error from "./pages/error/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shared />}>
          <Route index element={<Home />} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
