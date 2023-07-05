import Form from "./pages/Form";
import Signup from "./pages/signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
      </BrowserRouter>


  );
}
export default App;