import NavBar from "./Components/NavBar/NavBar";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Home from "./Components/Home/Home";
import AuthForm from "./Components/AuthForm/AuthForm";
import Blog from "./Components/Blog/Blog";

export default [
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    // Having this structure so I don't have to reload the navbar
    // and not spamming errorElement for every route because
    // this one catches everything from its children
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <AuthForm key="login" path="login" /> },
      {
        path: "register",
        element: <AuthForm key="register" path="register" />,
      },
      { path: "posts/:postId", element: <Blog /> },
    ],
  },
];
