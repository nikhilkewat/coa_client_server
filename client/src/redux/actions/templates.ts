import { Actions, Callbacks, COATemplateTypes } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";
import { TEMPLATE_LIST } from "../constTypes";


export const saveTemplateMaster = (data: COATemplateTypes, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "post",
        url: `${keys.ServicePath}/api/templates`,
        data,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}

export const deleteTemplateMaster = (id: number, { onSuccess, onError }: Callbacks) => async () => {

    await axios({
        method: "delete",
        url: `${keys.ServicePath}/api/templates/${id}`,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}
const _template_list = (data: any) => {
    console.log("DATA",data)
    return {
        payload: data,
        type: TEMPLATE_LIST
    } as Actions
}
export const get_templates_list = (callback?: Callbacks) => async (dispatch: any) => {

    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/templates`,
    }).then(async (res: AxiosResponse) => {
        console.log(res);
        const tempData = [...res.data.rows];
        const tData:any=[];
        console.log(tempData);
        // await tempData.map(x => {
        //     const t = {
        //         ...x,
        //         testMasterIds: x.testIds.split(",").map((x:string)=>+x)
        //     }
        //     tData.push(t);
        //     console.log(tData);
        // })
        // console.log(tData)
        dispatch(_template_list(tempData));
        if (callback?.onSuccess) callback?.onSuccess(tempData);
    }).catch((e) => {
        // toast.error(e.toString())
        if (callback?.onError) callback?.onError(e);
    })

}