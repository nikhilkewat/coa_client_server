import { Actions, Callbacks, TestMasterTypes } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";
import { TEST_MASTER_LIST, TEST_MASTER_LIST_BY_PRODUCT } from "../constTypes";


export const saveTestMaster = (data: TestMasterTypes, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "post",
        url: `${keys.ServicePath}/api/testmaster`,
        data,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}

export const deleteTestMaster = (id: number, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "delete",
        url: `${keys.ServicePath}/api/testmaster/${id}`,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}
const _test_master_list = (data: any) => {
    return {
        payload: data,
        type: TEST_MASTER_LIST
    } as Actions
}
export const get_testmaster_list = (callback?: Callbacks) => async (dispatch: any) => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/testmaster`,
    }).then((res: AxiosResponse) => {
        dispatch(_test_master_list(res.data.rows));
        if (callback?.onSuccess) callback?.onSuccess(res.data.rows);
    }).catch((e) => {
        // toast.error(e.toString())
        if (callback?.onError) callback?.onError(e);
    })

}

const _test_master_by_products = (data: any) => {
    return {
        payload: data,
        type: TEST_MASTER_LIST_BY_PRODUCT
    } as Actions
}
export const get_tests_by_product = (productid: number, callback?: Callbacks) => async (dispatch: any) => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/testmaster/get_test_by_products/${productid}`,
    }).then((res: AxiosResponse) => {
        dispatch(_test_master_by_products(res.data.rows));
        if (callback?.onSuccess) callback?.onSuccess(res.data.rows);
    }).catch((e) => {
        // toast.error(e.toString())
        if (callback?.onError) callback?.onError(e);
    })

}