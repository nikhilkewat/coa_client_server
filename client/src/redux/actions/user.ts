import { UserTypes, Callbacks, Actions } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";
import { USER_MASTER_LIST } from "../constTypes";


export const save = (data: UserTypes, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "post",
        url: `${keys.ServicePath}/api/user`,
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
        url: `${keys.ServicePath}/api/user/${id}`,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}


const _user_list = (data: UserTypes) => {
    return {
        payload: data,
        type: USER_MASTER_LIST
    } as Actions
}

export const get_user_list = (callback?: Callbacks) => async (dispatch: any) => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/user`,
    }).then((res: AxiosResponse) => {
        dispatch(_user_list(res.data.rows))
        if (callback?.onSuccess) callback.onSuccess(res.data.rows);
    }).catch((e) => {
        // toast.error(e.toString())
        if (callback?.onError) callback?.onError(e);
    })




}