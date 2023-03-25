/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LogParams, SelectedOption } from "../common/commonTypes";
import { reportValidationSchema } from "./reportValidationSchema";
import { toast } from "react-toastify";
import { saveTestMaster, get_testmaster_list, deleteTestMaster } from "../../redux/actions/testmaster";
import { get_product_list } from "../../redux/actions/products";
import { useAppSelector } from "../../redux/store/hooks";
import { SingleValue } from "react-select";
import { ProductTypes } from "../Product/useProductHooks";

export type COAReportResult = {
    id?: number;
    coaReportMasterId?: number;
    templateId?: number;
    testId?: number;
    productId?: number;
    result?: string;
    specification?: string;
    grade?: string;
}
export type COAReportMaster = {
    id?: number;
    productId: number;
    grade: string;
    batchNo?: string;
    arNo?: string;
    mfgDate?: string | Date;
    expDate?: string;
    supplyQty?: number;
    pageNo?: number;
    selectedProduct?: SelectedOption | null;
    results?: COAReportResult[] | null;
} & LogParams

const intialValues: COAReportMaster = {
    id: 0,
    productId: 0,
    grade: '',
    batchNo: '',
    arNo: '',
    mfgDate: '',
    expDate: '',
    supplyQty: 1,
    pageNo: 1,
    results: null
}

export const useCOAReportHooks = () => {
    const dispatch = useDispatch<any>();
    const { product_list } = useAppSelector(obj => obj);
    const [formData, setFormData] = useState<COAReportMaster>(intialValues);
    const [rowData, setRowData] = useState<COAReportMaster[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, control
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(reportValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onProductChange = (option: SingleValue<SelectedOption>) => {
        const opt = option as ProductTypes;
        const { value, label, ...others } = opt
        setFormData((prev) => ({ ...prev, selectedProduct: { opt, other: others as ProductTypes }, productId: Number(opt.value) }));
    }

    const getTestMasterList = () => dispatch(get_testmaster_list({
        onSuccess: (res) => setRowData(res)
    }))

    const getProductList = () => dispatch(get_product_list())

    const onSubmit = () => {
        console.log(formData);
        // dispatch(saveTestMaster(formData, {
        //     onSuccess: () => { getTestMasterList(); setFormData(intialValues); }
        // }))
    }

    const onGridEdit = (data: any) => {

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
        getProductList();
    }, [])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors, control, product_list, onProductChange
    }
}