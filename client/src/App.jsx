import { RouterProvider } from "react-router-dom";
import router from "./Router";
import StateContextProvider from "./context/context";

function App() {
  return (
    <StateContextProvider>
      <RouterProvider router={router} />
    </StateContextProvider>
  );
}

export default App;
