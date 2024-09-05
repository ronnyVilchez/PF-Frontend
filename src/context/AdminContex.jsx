import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";
import { createRpt, reportesAll, usersAll } from "../services/servicesAll";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [, setLocation] = useLocation()
    const [userAll, setUserAll] = useState([])
    const [adminAll, setAdminAll] = useState([])
    const [reportAll, setReportAll] = useState([])

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

    return (
        <AdminContext.Provider value={{adminAll,createReport, reportAll}}>
            {children}
        </AdminContext.Provider>
    )
}