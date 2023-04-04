/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { LogParams, SelectedOption } from "../common/commonTypes";
import { reportValidationSchema } from "./reportValidationSchema";
import { toast } from "react-toastify";
import { saveTestMaster, get_testmaster_list, deleteTestMaster, get_tests_by_product } from "../../redux/actions/testmaster";
import { get_product_list } from "../../redux/actions/products";
import { useAppSelector } from "../../redux/store/hooks";
import { SingleValue } from "react-select";
import { ProductTypes } from "../Product/useProductHooks";
import { saveCOATestGeneration } from "../../redux/actions/generateTest";

export type COAReportResult = {
    id?: number;
    coaReportMasterId?: number;
    templateId?: number;
    testId?: number;
    productId?: number;
    result?: string;
    specification?: string;
    grade?: string;
    selectedTest?: SelectedOption | null;
    testName?: string;
    template?: string;
}


export type COAReportMaster = {
    id?: number;
    productId: number;
    grade: string;
    batchNo?: string;
    arNo?: string;
    mfgDate?: string | Date;
    expDate?: string | Date;
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
    results: []
}

const intialTranValues: COAReportResult = {
    id: 0,
    coaReportMasterId: 0,
    templateId: 0,
    testId: 0,
    productId: 0,
    result: '',
    specification: '',
    grade: '',
    selectedTest: null,
    testName: '',
    template: ''
}

export const useCOAReportHooks = () => {
    const dispatch = useDispatch<any>();
    const { product_list, test_master_list_by_product } = useAppSelector(obj => obj);
    const [formData, setFormData] = useState<COAReportMaster>(intialValues);
    const [formTestData, setFormTestData] = useState<COAReportResult>(intialTranValues);
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

    const handleTranChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormTestData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onProductChange = (option: SingleValue<SelectedOption>) => {
        const opt = option as ProductTypes;
        const { value, label, ...others } = opt
        setFormData((prev) => ({ ...prev, selectedProduct: { ...opt, other: others as ProductTypes }, productId: Number(opt.value) }));
    }

    const onTestChange = (option: SingleValue<SelectedOption>) => {
        setFormTestData((prev) => ({ ...prev, ...option, selectedTest: option, testId: Number(option?.value) }));
    }

    const getTestMasterList = () => dispatch(get_tests_by_product(formData.productId || 0, {
        onSuccess: (res) => setRowData(res)
    }))

    const getProductList = () => dispatch(get_product_list())

    const onAddTestData = () => {
        const t = [...formData.results!, { ...formTestData, id: Math.random() }];
        setFormData((prev) => ({ ...prev, results: t }));
        setFormTestData(intialTranValues);
    }
    const onRemoveTestData = (id: number) => {
        const t = formData.results?.filter(x => x.id !== id);
        setFormData((prev) => ({ ...prev, results: t }));
        setFormTestData(intialTranValues);
    }
    const onSubmit = () => {
        console.log(formData);
        const frmData: COAReportMaster = { ...formData, mfgDate: format(formData.mfgDate as Date, "yyyy-MM-dd"), expDate: format(formData.expDate as Date, "yyyy-MM-dd") }
        dispatch(saveCOATestGeneration(frmData, {
            onSuccess: () => { getTestMasterList(); setFormData(intialValues); }
        }))
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

    useEffect(() => {
        if (formData.productId > 0)
            getTestMasterList();
    }, [formData.productId])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors, control, product_list, onProductChange, test_master_list_by_product, formTestData, onTestChange, handleTranChange, onAddTestData, onRemoveTestData
    }
}