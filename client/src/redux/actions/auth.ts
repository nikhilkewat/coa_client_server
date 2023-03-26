import axios from "../../components/common/axios";
import { toast } from "react-toastify";
import { keys } from "../../config/dev";

export const login = (loginData?: any, onSccuess?: any, onError?: any) => async (dispatch: any) => {

  await axios
    .post(`${keys.ServicePath}/api/auth/login`, loginData)
    .then((res) => {
      if (!res.data?.success) {
        if (onError) onError(res.data);
      } else {
        if (onSccuess) { onSccuess(res) }
      }
    })
    .catch((e) => {
      toast.error(e.toString());
    });
};