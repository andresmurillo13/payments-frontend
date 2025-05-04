import { lazy } from "react"


const ProductPage = lazy(() => import('../pages/productPage'))


export const routes = [
    {
        path: '/products',
        to: '/products',
        component: ProductPage,
    }
]