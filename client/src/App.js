import Form from "./pages/Form";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Add from "./pages/add";

import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>


  );
}
export default App;