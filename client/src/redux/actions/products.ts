import { ProductTypes, Callbacks, Actions } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";
import { PRODUCTS_LIST } from "../constTypes";



export const saveProduct = (data: ProductTypes, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "post",
        url: `${keys.ServicePath}/api/products`,
        data,
    }).then((res: AxiosResponse) => {
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        if (onError) onError(e);
    })
}

export const deleteProduct = (id: number, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "delete",
        url: `${keys.ServicePath}/api/products/${id}`,
    }).then((res: AxiosResponse) => {
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        if (onError) onError(e);
    })
}
const _product_list = (data: ProductTypes) => {
    return {
        payload: data,
        type: PRODUCTS_LIST
    } as Actions
}

export const get_product_list = (callback?: Callbacks) => async (dispatch: any) => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/products`,
    }).then((res: AxiosResponse) => {
        dispatch(_product_list(res.data.rows))
        if (callback?.onSuccess) callback.onSuccess(res.data.rows);
    }).catch((e) => {
        if (callback?.onError) callback?.onError(e);
    })

}