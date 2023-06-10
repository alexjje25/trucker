import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Verify from "./verify-checklist";
import HomeMenu from "./home-menu";

// import FormEdit from "./FormEdit";



const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" index element={< Verify/>} />
      <Route path="/home-menu" element={< HomeMenu/>} />
      {/* <Route path="/form-edit/:id" index element={< FormEdit />} /> */}
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
    
  );
}

export default App;