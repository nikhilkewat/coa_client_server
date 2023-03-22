import { UserTypes, Actions } from "../../types";
import * as types from "../constTypes";

const initialState: UserTypes[] = [];

export const get_user_list = (state = initialState, action: Actions) => {
  switch (action.type) {
    case types.USER_MASTER_LIST:
      return action.payload || [];
    default:
      return state;
  }
};
