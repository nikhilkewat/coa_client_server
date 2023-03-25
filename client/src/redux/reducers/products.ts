import { ProductTypes, Actions } from "../../types";
import * as types from "../constTypes";

const initialState: ProductTypes[] = [];

export const product_list = (state = initialState, action: Actions) => {
    switch (action.type) {
        case types.PRODUCTS_LIST:
            return action.payload || [];
        default:
            return state;
    }
};