import { CustomerTypes, Actions } from "../../types";
import * as types from "../constTypes";

const initialState: CustomerTypes[] = [];

export const customer_list = (state = initialState, action: Actions) => {
    switch (action.type) {
        case types.CUSTOMER_LIST:
            return action.payload || [];
        default:
            return state;
    }
};