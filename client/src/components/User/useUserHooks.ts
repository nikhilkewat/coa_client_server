/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, get_user_list, save } from "../../redux/actions/user";
import { SelectedOption } from "../common/commonTypes";
import { userValidationSchema } from "./validationSchema";
import { toast } from "react-toastify";


export type UserTypes = {
    id?: number;
    fullName: string;
    userName: string;
    password: string;
    roleId: number;
    selectedRole?: SelectedOption | null | undefined;
}

const intialValues: UserTypes = {
    id: 0,
    fullName: '',
    userName: '',
    password: '',
    roleId: 0,
    selectedRole: null
}

export const useUserHooks = () => {
    const dispatch = useDispatch<any>();
    const [formData, setFormData] = useState<UserTypes>(intialValues);
    const [rowData, setRowData] = useState<UserTypes[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(userValidationSchema)
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const getUserList = () => dispatch(get_user_list({
        onSuccess: (res) => setRowData(res)
    }))

    const onSubmit = () => {
        dispatch(save(formData, {
            onSuccess: () => { getUserList(); setFormData(intialValues); reset(intialValues); }
        }))
    }

    const onGridEdit = (data: any) => {
        console.log(data.data);
        setFormData(data.data);
        reset(data.data);
    }

    const onGridDelete = (data: any) => {
        console.log(data);
        dispatch(
            deleteUser(data.data.id, {
                onSuccess: () => {
                    getUserList();
                    toast.success("User Deleted!!!");
                },
                onError: (err: any) => toast.error(err)
            })
        );;
    }



    useEffect(() => {
        getUserList();
    }, [])

    return {
        formData, setFormData, handleChange, intialValues, onSubmit, rowData, onGridEdit, onGridDelete, register, handleSubmit, errors
    }
}