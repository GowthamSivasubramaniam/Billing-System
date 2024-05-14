import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Signup from "./signup";
import Login from "./modules/login";
import Inventory from "./modules/inventory";
import ClientManage from "./modules/clientmanage";
import App1 from "./App1";
import Dashboard from "./modules/dashboard";

const App = () => {
  return (
    <RouterProvider router={createBrowserRouter([

        {
          path:'/',
          element:<Login/>,
        },
        {
            path:'/main',
            element:<App1/> ,

          children:[
            {
              path:'manage',
              element:<ClientManage/>
            },
            {
              path:'dashboard',
              element:<Dashboard/>
            },
            {
              path:'inventory',
              element:<Inventory/>
            },

          ]
        }
      ])}/>

   
  );
};

export default App;
