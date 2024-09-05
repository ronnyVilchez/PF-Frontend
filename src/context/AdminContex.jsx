import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";
import { createRpt, createUs, deleteReport, deleteUser, editeUs, reportesAll, reportesOne, reportesUser, updateReport, updateReportResident, usersAll } from "../services/servicesAll";
import swal from "sweetalert";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [location, setLocation] = useLocation()
    const [userAll, setUserAll] = useState([])
    const [adminAll, setAdminAll] = useState([])
    const [reportAll, setReportAll] = useState([])
    const [reportFrUs, setReportFrUs] = useState([])
    const [reportFOne, setReportFOne] = useState([])
    const queryClient = useQueryClient();

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: usersAll,
    })

    useEffect(() => {
        if (users) {
            setUserAll(users)
            const adm = users.filter((us) => us.rol === 'administrador')
            setAdminAll(adm)
        }
    }, [users])

    const { data: reports } = useQuery({
        queryKey: ['reports'],
        queryFn: reportesAll,
    })

    useEffect(() => {
        if (reports) {
            setReportAll(reports)
            /*  const adm = users.filter((us) => us.rol === 'administrador')
             setAdminAll(adm) */
        }
    }, [reports])

    const { data: reportUs } = useQuery({
        queryKey: ['reportUs'],
        queryFn: reportesUser,
        enabled: location === '/dashboard/incident'
    })

    useEffect(() => {
        if (reportUs) {
            setReportFrUs(reportUs)
        }
    }, [reportUs])

    const { data: reportOne } = useQuery({
        queryKey: ['reportOne'],
        queryFn: reportesOne,
        enabled: location === '/dashboard/edit'
    })

    useEffect(() => {
        if (reportOne) {
            setReportFOne(reportOne)
        }
    }, [reportOne])

    const createReport = useMutation({
        mutationKey: ['createReport'],
        mutationFn: createRpt,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })
            setLocation('/dashboard/incident')

        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })

    const updateStatus = useMutation({
        mutationKey: ['updateStatus'],
        mutationFn: updateReport,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })
            queryClient.invalidateQueries('reports')
        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })

    const updateReportUs = useMutation({
        mutationKey: ['updateReport'],
        mutationFn: updateReportResident,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })
            queryClient.invalidateQueries('reportUs')
            setLocation('/dashboard/incident')

        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })

    const delReport = useMutation({
        mutationKey: ['delReport'],
        mutationFn: deleteReport,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })
            queryClient.invalidateQueries('reports')
            queryClient.invalidateQueries('reportUs')
        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })


    const createUser = useMutation({
        mutationKey: ['createUser'],
        mutationFn: createUs,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })
            queryClient.invalidateQueries('users')
            setLocation('/dashboard/users')

        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })

    const updatUser = useMutation({
        mutationKey: ['updatUser'],
        mutationFn: editeUs,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })

            queryClient.invalidateQueries('users')
            setLocation('/dashboard')

        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })

    const delUser = useMutation({
        mutationKey: ['delUser'],
        mutationFn: deleteUser,
        onSuccess: (data) => {
            swal({
                title: data.message,
                icon: "success",
                dangerMode: true,
            })
            queryClient.invalidateQueries('users')
        },
        onError: (err) => {
            swal({
                title: "Ups!",
                text: err.response.data.message,
                icon: "warning",
                dangerMode: true,
            })
        }
    })

    return (
        <AdminContext.Provider value={{
            adminAll,
            createReport,
            delReport,
            createUser,
            reportFrUs,
            userAll,
            reportAll,
            reportFOne,
            updateStatus,
            delUser,
            updateReportUs,
            updatUser
        }}>
            {children}
        </AdminContext.Provider>
    )
}