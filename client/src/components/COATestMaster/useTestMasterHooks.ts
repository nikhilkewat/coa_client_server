/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LogParams, SelectedOption } from "../common/commonTypes";
import { userValidationSchema } from "./testMasterValidationSchema";
import { toast } from "react-toastify";
import { saveTestMaster, get_testmaster_list, deleteTestMaster } from "../../redux/actions/testmaster";
import { get_product_list } from "../../redux/actions/products";
import { useAppSelector } from "../../redux/store/hooks";
import { SingleValue } from "react-select";
import { ProductTypes } from "../Product/useProductHooks";


export type TestMasterTypes = {
    id?: number;
    testName: string;
    testResultsGroupConcat: string;
    testResults?: string[];
    productId?: number;
    productName?: string;
    selectedProduct?: SelectedOption | null
} & LogParams & SelectedOption

const intialValues: TestMasterTypes = {
    id: 0,
    testName: '',
    testResultsGroupConcat: '',
    productId: 0,
    selectedProduct: null,
}

export const useTestMasterHooks = () => {
    const dispatch = useDispatch<any>();
    const { product_list } = useAppSelector(obj => obj);
    const [formData, setFormData] = useState<TestMasterTypes>(intialValues);
    const [rowData, setRowData] = useState<TestMasterTypes[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, control
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(userValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onProductChange = (option: SingleValue<SelectedOption>) => {
        const opt = option as ProductTypes;
        setFormData((prev) => ({ ...prev, selectedProduct: opt, productId: opt.id }));
    }

    const getTestMasterList = () => dispatch(get_testmaster_list({
        onSuccess: (res) => setRowData(res)
    }))

    const getProductList = () => dispatch(get_product_list())

    const onSubmit = () => {
        console.log(formData);
        dispatch(saveTestMaster(formData, {
            onSuccess: () => { getTestMasterList(); setFormData(intialValues); reset(intialValues); }
        }))
    }

    const onGridEdit = (data: any) => {
        console.log(product_list)
        const selectedProduct = product_list?.find((x: ProductTypes) => x.id === data.data.productId) || null;
        setFormData({ ...data.data, selectedProduct });
        reset({ ...data.data, selectedProduct });
    }

    const onGridDelete = (data: any) => {
        dispatch(
            deleteTestMaster(data.data.id, {
                onSuccess: () => {
                    getTestMasterList();
                    toast.success("Test Master Deleted!!!");
                },
                onError: (err: any) => toast.error(err)
            })
        );;
    }



    useEffect(() => {
        getTestMasterList();
        // getProductList();
    }, [])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors, control, product_list, onProductChange
    }
}