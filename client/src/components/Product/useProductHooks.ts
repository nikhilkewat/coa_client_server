/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProduct, get_product_list, deleteProduct } from "../../redux/actions/products";
import { LogParams, SelectedOption } from "../common/commonTypes";
import { productValidationSchema } from "./productValidationSchema";
import { toast } from "react-toastify";

export type ProductTypes = {
    id?: number;
    productCode: string;
    productName: string;
    casNo: string;
    molecularWeight: number;
    molecularFormula?: string;
    
} & LogParams & SelectedOption;

const intialValues: ProductTypes = {
    id: 0,
    productCode: '',
    productName: '',
    casNo: '',
    molecularWeight: 0,
    molecularFormula: ''
}

export const useProductHooks = () => {
    const dispatch = useDispatch<any>();
    const [formData, setFormData] = useState<ProductTypes>(intialValues);
    const [rowData, setRowData] = useState<ProductTypes[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(productValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const getProductList = () => dispatch(get_product_list({
        onSuccess: (res) => setRowData(res)
    }))

    const onSubmit = () => {
        dispatch(saveProduct(formData, {
            onSuccess: () => { getProductList(); setFormData(intialValues); reset(intialValues); }
        }))
    }

    const onGridEdit = (data: any) => {
        setFormData(data.data);
        reset(data.data);
    }

    const onGridDelete = (data: any) => {
        dispatch(
            deleteProduct(data.data.id, {
                onSuccess: () => {
                    getProductList();
                    toast.success("Product Deleted!!!");
                },
                onError: (err: any) => toast.error(err)
            })
        );;
    }



    useEffect(() => {
        getProductList();
    }, [])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors
    }
}