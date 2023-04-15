/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { LogParams, SelectedOption } from "../common/commonTypes";
import { reportValidationSchema } from "./reportValidationSchema";
import { toast } from "react-toastify";
import {  get_testmaster_list, deleteTestMaster } from "../../redux/actions/testmaster";
import { get_product_list } from "../../redux/actions/products";
import { useAppSelector } from "../../redux/store/hooks";
import { SingleValue } from "react-select";
import { ProductTypes } from "../Product/useProductHooks";
import { getCOATestGeneration, saveCOATestGeneration } from "../../redux/actions/generateTest";
import { get_templates_list } from "../../redux/actions/templates";
import { COATemplateTypes } from "../COATemplates/useCOATemplateHooks";
import { TestMasterTypes } from "../COATestMaster/useTestMasterHooks";
import { useNavigate } from "react-router-dom";
import { get_customer_list } from "../../redux/actions/customer";
import { CustomerTypes } from "../Customer/useCustomerHooks";
import { get_user_list } from "../../redux/actions/user";
import { UserTypes } from "../../types";

export type COAReportResult = {
    id?: number;
    coaReportMasterId?: number;
    templateId?: number;
    testId?: number;
    productId?: number;
    result?: string;
    results?: string[];
    specification?: string;
    grade?: string;
    selectedTest?: SelectedOption | null;
    testName?: string;
    template?: string;
}


export type COAReportMaster = {
    id?: number;
    productId: number;
    customerId: number;
    customerName?: string;
    grade: string;
    batchNo?: string;
    arNo?: string;
    mfgDate?: string | Date;
    expDate?: string | Date;
    supplyQty?: number;
    pageNo?: number;
    selectedProduct?: SelectedOption | null;
    selectedCustomer?: SelectedOption | null;
    preparedBy?: number;
    approvedBy?: number;
    reviewedBy?: number;
    selectedPreparedBy?: SelectedOption | null;
    selectedApprovedBy?: SelectedOption | null;
    selectedReviewedBy?: SelectedOption | null;
    results?: COAReportResult[] | null;
} & LogParams

const intialValues: COAReportMaster = {
    id: 0,
    productId: 0,
    customerId: 0,
    customerName: '',
    grade: '',
    batchNo: '',
    arNo: '',
    mfgDate: '',
    expDate: '',
    supplyQty: 1,
    pageNo: 1,
    approvedBy:0,
    preparedBy:0,
    reviewedBy:0,
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
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { product_list, test_master_list_by_product, template_list, test_master_list, customer_list, user_list } = useAppSelector(obj => obj);
    const [formData, setFormData] = useState<COAReportMaster>(intialValues);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [formTestData, setFormTestData] = useState<COAReportResult>(intialTranValues);
    const [rowData, setRowData] = useState<COAReportMaster[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, control, setValue
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(reportValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const onTranResultChange = (option: SingleValue<SelectedOption>, data?: COAReportResult) => {
        const ch = [...formData?.results!];
        const d = ch.find(x => x.id === data?.id) as COAReportResult;
        d.result = option?.value as string;
        setFormData((prev) => ({ ...prev, results: ch }));
    }
    const handleTranChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data?: COAReportResult) => {
        const ch = [...formData?.results!];
        const name = e.target.name;
        const d = ch.find(x => x.id === data?.id) as COAReportResult;
        //@ts-ignore
        d[name] = e.target.value;

        setFormData((prev) => ({ ...prev, results: ch }));
    }

    const onProductChange = (option: SingleValue<SelectedOption>) => {
        const opt = option as ProductTypes;
        const { value, label, ...others } = opt
        setFormData((prev) => ({ ...prev, selectedProduct: { ...opt, other: others as ProductTypes }, productId: Number(opt.value) }));
        setValue("productId", opt.value)
    }

    const onCustomerChange = (option: SingleValue<SelectedOption>) => {
        const opt = option as CustomerTypes;
        const { value, label, ...others } = opt
        setFormData((prev) => ({ ...prev, selectedCustomer: { ...opt, other: others as CustomerTypes }, customerName: label, customerId: Number(opt.value) }));
        setValue("customerId", opt.value)
    }

    const onTestChange = (option: SingleValue<SelectedOption>) => {

        const { label, value, ...other } = option as TestMasterTypes;
        const tresults = other.testResultsGroupConcat.split(",");
        setFormTestData((prev) => ({ ...prev, ...option, selectedTest: { label, value, other }, testId: Number(option?.value), results: tresults }));


    }

    const onTemplateChange = (option: SingleValue<SelectedOption>) => {

        const { label, value, ...others } = option as COATemplateTypes;
        const testIds = others.testIds?.split(",").map(x => +x);
        const tests = test_master_list.filter((x: TestMasterTypes) => testIds?.includes(x?.id!));
        const t: COAReportResult[] = [];
        tests.forEach((x: TestMasterTypes) => {

            const res: COAReportResult = {
                id: Math.random(),
                templateId: value as number,
                testId: x.id,
                testName: x.testName,
                grade: '',
                specification: '',
                results: x.testResultsGroupConcat.split(","),
                result: ''
            }
            t.push(res);
        })
        setFormData((prev) => ({ ...prev, results: t }));
        //setFormTestData((prev) => ({ ...prev, ...option, selectedTest: option, testId: Number(option?.value) }));
    }

    useEffect(() => {
        if (formData?.results?.length! <= 0) {
            setTransactionError(true)
        } else {
            setTransactionError(false);
        }
    }, [formData.results])

    const getTestMasterList = () => dispatch(getCOATestGeneration({
        onSuccess: (res) => { setRowData(res.data.rows); }
    }))

    const getTestMasters = () => dispatch(get_testmaster_list())

    const getProductList = () => dispatch(get_product_list())

    const getCustomerList = () => dispatch(get_customer_list())

    const getUserList = () => dispatch(get_user_list())

    const onAddTestData = () => {

        if (formTestData?.testId! <= 0) {
            return;
        }
        const t: COAReportResult[] = [...formData.results!, { ...formTestData, id: Math.random(), results: formTestData.selectedTest?.other.testResultsGroupConcat.split(",") }];

        setFormData((prev) => ({ ...prev, results: t }));
        setFormTestData(intialTranValues);
        //reset(intialTranValues);
    }
    const onRemoveTestData = (id: number) => {
        const t = formData.results?.filter(x => x.id !== id);
        setFormData((prev) => ({ ...prev, results: t }));
        setFormTestData(intialTranValues);
    }
    const onSubmit = () => {
        if (formData?.results?.length! <= 0) {
            setTransactionError(true)
            return;
        }
        const frmData: COAReportMaster = { ...formData, mfgDate: format(formData.mfgDate as Date, "yyyy-MM-dd"), expDate: format(formData.expDate as Date, "yyyy-MM-dd") }
        dispatch(saveCOATestGeneration(frmData, {
            onSuccess: () => { getTestMasterList(); setFormData(intialValues); reset(intialValues); navigate("/app/testlist"); }
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

    const getTemplateList = () => dispatch(get_templates_list())

    const onUserChanged = (option: SingleValue<SelectedOption>, type: string) => {
        const opt = option as UserTypes;
        const { value, label, ...others } = opt
        if (type === "prepared")
            setFormData((prev) => ({ ...prev, selectedPreparedBy: { ...opt, other: others as UserTypes }, preparedBy: Number(opt.value) }));
        else if (type === "approved")
            setFormData((prev) => ({ ...prev, selectedApprovedBy: { ...opt, other: others as UserTypes }, approvedBy: Number(opt.value) }));
        else if (type === "reviewed")
            setFormData((prev) => ({ ...prev, selectedReviewedBy: { ...opt, other: others as UserTypes }, reviewedBy: Number(opt.value) }));
    }

    useEffect(() => {
        getTestMasterList();
        getProductList();
        getTemplateList();
        getTestMasters();
        getCustomerList()
        getUserList();
    }, [])

    // useEffect(() => {
    //     if (formData.productId > 0)
    //         getTestMasterList();
    // }, [formData.productId])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors, control, product_list, onProductChange, test_master_list_by_product, formTestData, onTestChange, handleTranChange, onAddTestData, onRemoveTestData, template_list, test_master_list, onTemplateChange, onTranResultChange, transactionError, customer_list, onCustomerChange, user_list, onUserChanged
    }
}