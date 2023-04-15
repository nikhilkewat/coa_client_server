import { CustomerTypes, Callbacks, Actions } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";
import { CUSTOMER_LIST } from "../constTypes";


export const save = (data: CustomerTypes, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "post",
        url: `${keys.ServicePath}/api/customer`,
        data,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}

export const deleteUser = (id: number, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "delete",
        url: `${keys.ServicePath}/api/customer/${id}`,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}

const _customer_list = (data: CustomerTypes) => {
    return {
        payload: data,
        type: CUSTOMER_LIST
    } as Actions
}

export const get_customer_list = (callback?: Callbacks) => async (dispatch: any) => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/customer`,
    }).then((res: AxiosResponse) => {
        dispatch(_customer_list(res.data.rows))
        if (callback?.onSuccess) callback.onSuccess(res.data.rows);
    }).catch((e) => {
        if (callback?.onError) callback?.onError(e);
    })

}