import Form from "./pages/Form";
import Signup from "./pages/signup";
import Users from "./pages/users";
import Edit from "./pages/editUser";
import PromptEdit from "./pages/editPrompt";
import PromptImage from "./pages/imagesPrompt";
import PromptCompletitions from "./pages/completitionsPrompt";


import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/editUser" element={<Edit />} />
          <Route path="/editPrompt" element={<PromptEdit />} />
          <Route path="/imagePrompt" element={< PromptImage/>} />
          <Route path="/completitionsPrompt" element={< PromptCompletitions/>} />
        </Routes>
      </BrowserRouter>


  );
}
export default App;