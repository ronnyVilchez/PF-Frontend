import { createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";
import swal from "sweetalert";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [, setLocation] = useLocation()
    const [infoUser, setInfoUser] = useState([])

    const loginUser = useMutation({
        mutationKey: ['login'],
        mutationFn: Auth,
        onSuccess: (data) => {
            localStorage.setItem('token', data.tokem)
            localStorage.setItem('userId', data.user.userId)
            setInfoUser(data.user)
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


    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('idIn')
        localStorage.removeItem('idR')
        setLocation('/login')

    }

    return (
        <AuthContext.Provider value={{ loginUser, logout, infoUser }}>
            {children}
        </AuthContext.Provider>
    )
}