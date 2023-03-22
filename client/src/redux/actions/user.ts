import { UserTypes, Callbacks } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";


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

export const get_user_list = ({ onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/user`,
    }).then((res: AxiosResponse) => {
    
        if (onSuccess) onSuccess(res.data.rows);
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })

}