import { createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";

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
            console.log(data);
            setInfoUser(data.user)
            setLocation('/dashboard')

        },
        onError: (err) => {
            console.log(err);
        }
    })


    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setLocation('/login')

    }

    return (
        <AuthContext.Provider value={{ loginUser, logout, infoUser }}>
            {children}
        </AuthContext.Provider>
    )
}