import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Cart from "../Pages/Cart";
import Productdetaills from "../Pages/Productdetaills";
import Home from "../Pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/product/:id" element={<Productdetaills />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

export default router;
