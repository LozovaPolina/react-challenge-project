import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import { Provider } from "react-redux";
import store from "./store/index";
import ChallengesPage from "./pages/Challenges";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import NewChallenge from "./components/NewChallenge";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/challenges",
    element: <ChallengesPage />,
    children: [
      {
        path: "new",
        element: <NewChallenge />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
