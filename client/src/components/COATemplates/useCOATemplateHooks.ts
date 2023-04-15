/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LogParams, SelectedOption } from "../common/commonTypes";
import { templateValidationSchema } from "./templateValidationSchema";
import { toast } from "react-toastify";
import { get_testmaster_list } from "../../redux/actions/testmaster";
import { useAppSelector } from "../../redux/store/hooks";
import { MultiValue } from "react-select";
import { ProductTypes } from "../Product/useProductHooks";
import { TestMasterTypes } from "../COATestMaster/useTestMasterHooks";
import { deleteTemplateMaster, get_templates_list, saveTemplateMaster } from "../../redux/actions/templates";


export type COATemplateTypes = {
    id?: number;
    template: string;
    selectedTestMasters?: TestMasterTypes[] | null;
    applicableTests?: string;
    testMasterIds?: number[] | null;
    testIds?: string;
} & LogParams & SelectedOption;

const intialValues: COATemplateTypes = {
    id: 0,
    template: '',
    selectedTestMasters: [],
    testMasterIds: []
}

export const useCOATemplateHooks = () => {
    const dispatch = useDispatch<any>();
    const { test_master_list } = useAppSelector(obj => obj);
    const [formData, setFormData] = useState<COATemplateTypes>(intialValues);
    const [rowData, setRowData] = useState<COATemplateTypes[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, control
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(templateValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onTestMasterChange = (option: MultiValue<any>) => {
        const opt = option as TestMasterTypes[] || null;
        const testMasterIds = opt.map(x => x.id as number) || [];
        setFormData((prev) => ({ ...prev, testMasterIds, selectedTestMasters: opt }));
    }

    const getTemplateList = () => dispatch(get_templates_list({
        onSuccess: (res) => {setRowData(res)}
    }))

    const getTestMasterList = () => dispatch(get_testmaster_list());


    const onSubmit = () => {
        const { selectedTestMasters, ...others } = formData;
        dispatch(saveTemplateMaster(others, {
            onSuccess: () => { getTemplateList(); setFormData(intialValues); reset(intialValues); }
        }))
    }

    const onGridEdit = (data: any) => {
        const tmptestMasterIds = data.data.testIds.split(",").map((x:string)=>+x);
        const selectedTestMasters = test_master_list?.filter((x: ProductTypes) => tmptestMasterIds.includes(x.id)) || null;
        const testMasterIds = selectedTestMasters?.map((x: TestMasterTypes) => x.id as number) || [];
        setFormData({ ...data.data, selectedTestMasters, testMasterIds });
        reset({ ...data.data, selectedTestMasters, testMasterIds });
    }

    const onGridDelete = (data: any) => {
        dispatch(
            deleteTemplateMaster(data.data.id, {
                onSuccess: () => {
                    getTemplateList();
                    toast.success("Template Deleted!!!");
                },
                onError: (err: any) => toast.error(err)
            })
        );;
    }

    useEffect(() => {
        getTemplateList();
        getTestMasterList();
    }, [])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors, control, test_master_list, onTestMasterChange,reset
    }
}