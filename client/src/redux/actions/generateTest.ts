import { Callbacks } from "../../types";
import axios from "../../components/common/axios";
import { keys } from "../../config/dev";
import { AxiosResponse } from "axios";
import { COAReportMaster } from "../../components/COAGenerateTest/useCOAReportHooks";


export const saveCOATestGeneration = (data: COAReportMaster, { onSuccess, onError }: Callbacks) => async () => {
    await axios({
        method: "post",
        url: `${keys.ServicePath}/api/generatereport`,
        data,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}

export const getCOATestGeneration = ({onSuccess, onError }: Callbacks) => async () => {
    await axios({
        method: "get",
        url: `${keys.ServicePath}/api/generatereport`,
    }).then((res: AxiosResponse) => {
        // toast.success("Added successfully!!!")
        if (onSuccess) onSuccess(res)
    }).catch((e) => {
        // toast.error(e.toString())
        if (onError) onError(e);
    })
}