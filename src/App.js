import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
         <Routes>
               <Route path="/" element={<LoginPage />} />
               <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
