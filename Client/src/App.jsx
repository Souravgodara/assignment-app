import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { lazy } from "react";
import { UserContextProvider } from "./context/userContext";

const NotFound = lazy(() => import("./pages/NotFound"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <UserContextProvider>
          <Home />
        </UserContextProvider>
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/SignIn",
    element: (
      <UserContextProvider>
        <SignIn />
      </UserContextProvider>
    ),
    /*  errorElement: <NotFound />, */
  },
  {
    path: "/SignUp",
    element: (
      <UserContextProvider>
        <SignUp />
      </UserContextProvider>
    ),
    /* errorElement: <NotFound />, */
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
