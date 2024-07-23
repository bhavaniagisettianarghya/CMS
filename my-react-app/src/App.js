// import {
//   BrowserRouter as Router,
//   Route,
//   BrowserRouter,
//   Routes,
// } from "react-router-dom";

// // import UserRegister from "./UserRegister";
// import AdminLogin from "./AdminLogin";
// // import Rolecreation from "./Rolecreation";

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           {/* <Route path="/" element={<UserRegister />} /> */}
//           <Route path="/" element={<AdminLogin />} />
//           {/* <Route path="/" element={<Rolecreation  />} /> */}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Shift from "./Components/Shift";
import TimePick from "./Components/TimePick";
import Reports from "./Components/Reports";
import Reportspiechart from "./Components/Reportspiechart";
import Shiftpractice from "./Components/Shiftpractice";
// import Dashboard from "./Page/Dashboard";
// import Product from "./Page/Product";
// import Services from "./Page/Services";
// import Settings from "./Page/Settings";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shift />}></Route>
          <Route path="/time" element={<TimePick />}></Route>
          <Route path="/Reports" element={<Reports />}></Route>
          <Route path="/Reportspiechart" element={<Reportspiechart />}></Route>
          <Route path="/Shiftpractice" element={<Shiftpractice />}></Route>
          {/* <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/settings" element={<Settings />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
