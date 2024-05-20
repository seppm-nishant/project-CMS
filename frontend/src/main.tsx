import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  // LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import CustomeRoot from "./components/RootComponent.tsx";
import "./index.css";
import TableDisplay from "./components/TableDisplay.tsx";
import RelationCreation from "./components/RelationCreation.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomeRoot />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/relation/:name",
        element: <TableDisplay />,
      },
      {
        path: "/relationCreation",
        element: <RelationCreation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
