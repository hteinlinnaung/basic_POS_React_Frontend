import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Team from "./features/teams/component/Team"
import Dashboard from "./components/layout/Dashboard"
import Products from "./features/products/component/Products"
import Customers from "./features/customers/component/Customers"
import Orders from "./features/orders/component/Orders"
import Reports from "./features/reports/component/Reports"
import Sales from "./features/sales/component/Sales"
import Settings from "./features/settings/component/Settings"

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
            index: true,
            element: <Dashboard/>
        },
        {
            path:'/sales',
            element:<Sales/>
        },

        {
            path:'/products',
            element:<Products/>
        },
        {
            path:'/customers',
            element:<Customers/>
        },
        {
            path:'/orders',
            element:<Orders/>
        },
        {
            path:'/reports',
            element:<Reports/>
        },
        {
            path:'/team',
            element:<Team/>
        },
        {
            path:'/settings',
            element:<Settings/>
        },
      ]
      
    },
    /* {
        path:'/team',
        element:<Team/>
    } */
    
])