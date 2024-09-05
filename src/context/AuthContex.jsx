import { createContext } from "react";
import { useMutation, useQuery } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [, setLocation] = useLocation()

    const loginUser = useMutation({
        mutationKey: ['login'],
        mutationFn: Auth,
        onSuccess: (data) => {
            localStorage.setItem('token', data.tokem)
            localStorage.setItem('userId', data.user.userId)
            console.log(data);
            setLocation('/dashboard')

        },
        onError: (err) => {
            console.log(err);
        }
    })

    return (
        <AuthContext.Provider value={{ loginUser }}>
            {children}
        </AuthContext.Provider>
    )
}