import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import Home from "./pages/Home/Home";
  import Hotel from "./pages/Hotel/Hotel";
  import List from "./pages/List/List";
  

import React from 'react'

const Router = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/hotels" element={<List/>} />
                <Route path="/hotels/hotel" element={<Hotel/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router;