import { TestMasterTypes, Actions } from "../../types";
import * as types from "../constTypes";

const initialState: TestMasterTypes[] = [];

export const test_master_list = (state = initialState, action: Actions) => {
    switch (action.type) {
        case types.TEST_MASTER_LIST:
            return action.payload || [];
        default:
            return state;
    }
};

export const test_master_list_by_product = (state = initialState, action: Actions) => {
    switch (action.type) {
        case types.TEST_MASTER_LIST_BY_PRODUCT:
            return action.payload || [];
        default:
            return state;
    }
};