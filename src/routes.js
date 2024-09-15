import { lazy } from "react";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import App from "./App";

const NotFound = lazy(() => import("./pages/NotFound"));
const AccessDenied = lazy(() => import("./pages/AccessDenied"));

export const privateRoutes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/post/:postId",
    element: <Profile />,
  },
  {
    path: "/my/post/:postId",
    element: <Profile />,
  },
  {
    path: "/user/:userId",
    element: <Profile />,
  },
  {
    path: "/following",
    element: <Profile />,
  },
];

export const publicRoutes = [
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
