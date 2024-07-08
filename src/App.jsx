import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
