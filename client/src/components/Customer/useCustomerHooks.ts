/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, get_customer_list, save } from "../../redux/actions/customer";
import { customerValidationSchema } from "./validationSchema";
import { toast } from "react-toastify";
import { LogParams, SelectedOption } from "../common/commonTypes";


export type CustomerTypes = {
    id?: number;
    fullName: string;
    address: string;
    contactPersonName?: string;
    contactPersonEmail?: string;
    contactPersonMobile?: string;
    contactPersonName1?: string;
    contactPersonEmail1?: string;
    contactPersonMobile1?: string;
}& LogParams & SelectedOption

const intialValues: CustomerTypes = {
    id: 0,
    fullName: '',
    address: '',
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonMobile: '',
    contactPersonName1: '',
    contactPersonEmail1: '',
    contactPersonMobile1: '',
}

export const useUserHooks = () => {
    const dispatch = useDispatch<any>();
    const [formData, setFormData] = useState<CustomerTypes>(intialValues);
    const [rowData, setRowData] = useState<CustomerTypes[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(customerValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const getUserList = () => dispatch(get_customer_list({
        onSuccess: (res) => setRowData(res)
    }))

    const onSubmit = () => {
        dispatch(save(formData, {
            onSuccess: () => { getUserList(); setFormData(intialValues); reset(intialValues); }
        }))
    }

    const onGridEdit = (data: any) => {
        setFormData(data.data);
        reset(data.data);
    }

    const onGridDelete = (data: any) => {
        
        dispatch(
            deleteUser(data.data.id, {
                onSuccess: () => {
                    getUserList();
                    toast.success("Customer Deleted!!!");
                },
                onError: (err: any) => toast.error(err)
            })
        );;
    }



    useEffect(() => {
        getUserList();
    }, [])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors,reset
    }
}