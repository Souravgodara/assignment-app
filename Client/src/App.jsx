import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContextProvider } from "./context/userContext";
import Navbar from "./components/Navbar";
import SearchResult from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <UserContextProvider>
          <Navbar />
          <Home />
        </UserContextProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/SignIn",
    element: (
      <UserContextProvider>
        <SignIn />
      </UserContextProvider>
    ),
  },
  {
    path: "/SignUp",
    element: (
      <UserContextProvider>
        <SignUp />
      </UserContextProvider>
    ),
  },
  {
    path: "/search/:query",
    element: (
      <ProtectedRoute>
        <UserContextProvider>
          <Navbar />
          <SearchResult />
        </UserContextProvider>
      </ProtectedRoute>
    ),
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
