import { useDispatch, useSelector } from "react-redux";
import { onLoadProducts } from "../store/products/productSlice";
import wompiApi from "../api/wompiApi";

export const useProductStore = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)

    const startLoadingProducts = async () => {


        const { data } = await wompiApi.get('/products/all')
     
        dispatch(onLoadProducts(data))


    }

    return {
        startLoadingProducts,
        products
    }

}