import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = ({ isAuth, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuth && token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuth, userAuth] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login userAuth={userAuth} />} />
        <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
