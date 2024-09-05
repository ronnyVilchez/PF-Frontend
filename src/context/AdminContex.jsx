import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";
import { createRpt, createUs, deleteReport, deleteUser, reportesAll, reportesUser, updateReport, usersAll } from "../services/servicesAll";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [location, setLocation] = useLocation()
    const [userAll, setUserAll] = useState([])
    const [adminAll, setAdminAll] = useState([])
    const [reportAll, setReportAll] = useState([])
    const [reportFrUs, setReportFrUs] = useState([])
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

    const createReport = useMutation({
        mutationKey: ['createReport'],
        mutationFn: createRpt,
        onSuccess: (data) => {
            console.log(data);
            setLocation('/dashboard/incident')

        },
        onError: (err) => {
            console.log(err);
        }
    })

    const updateStatus = useMutation({
        mutationKey: ['updateStatus'],
        mutationFn: updateReport,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries('reports')
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const delReport = useMutation({
        mutationKey: ['delReport'],
        mutationFn: deleteReport,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries('reports')
            queryClient.invalidateQueries('reportUs')
        },
        onError: (err) => {
            console.log(err);
        }
    })


    const createUser = useMutation({
        mutationKey: ['createUser'],
        mutationFn: createUs,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries('users')
            setLocation('/dashboard/users')

        },
        onError: (err) => {
            console.log(err);
        }
    })

    const delUser = useMutation({
        mutationKey: ['delUser'],
        mutationFn: deleteUser,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries('users')
        },
        onError: (err) => {
            console.log(err);
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
            updateStatus,
            delUser
        }}>
            {children}
        </AdminContext.Provider>
    )
}