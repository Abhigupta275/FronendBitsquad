import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Sidebar from "./Sidebar/Sidebar";
import FinanceIn from "./Finance/FinanceIn/FinanceIn";
import Invoice from "./Invoice/Invoice";
import Review from "./Invoice/Review";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sidebar" element={<Sidebar />}>
            <Route path="financein" element={<FinanceIn />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
            <Route path="/review" element={<Review  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
