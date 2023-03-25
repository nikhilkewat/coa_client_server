import { COATemplateTypes, Actions } from "../../types";
import * as types from "../constTypes";

const initialState: COATemplateTypes[] = [];

export const template_list = (state = initialState, action: Actions) => {
    switch (action.type) {
        case types.TEMPLATE_LIST:
            return action.payload || [];
        default:
            return state;
    }
};