import Index from "./Pages/Index/Index";
import Product from "./Pages/Product/Product";
import Category from "./Pages/Category/Category";
import NotFound from "./Pages/NotFound/NotFound";
import Cart from "./Pages/Cart/Cart";

const routes = [
    { path: "/", element: <Index /> },
    { path: "/product/:productID", element: <Product /> },
    { path: "/category/:categoryID", element: <Category /> },
    { path: "/404", element: <NotFound /> },
    { path: "/cart", element: <Cart /> },
]

export default routes