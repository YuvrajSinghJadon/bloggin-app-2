import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePost from "./components/Blog/CreateBlog";
import ReadPost from "./components/Blog/ReadBlog";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DataProvider from "./context/DataProvider";

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
  const [isAuth, userAuth] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<CreatePost />} /> */}
          <Route path="/login" element={<Login userAuth={userAuth} />} />
          <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/post" element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/post" element={<CreatePost />} />
          </Route>
          <Route path="/read/:_id" element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/read/:_id" element={<ReadPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
