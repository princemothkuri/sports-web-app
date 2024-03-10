import "./App.css";
import RegistrationForm from "./components/registration/RegistrationForm";
import Footer from "./components/footer/Footer";
import Search from "./components/map/Search";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
