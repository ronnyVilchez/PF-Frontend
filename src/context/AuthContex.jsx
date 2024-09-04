import { createContext } from "react";
import { useMutation, useQuery } from "react-query";
import { Auth } from "../services/AuthService";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const loginUser = useMutation({
        mutationKey:['login'],
        mutationFn: Auth,
        onSuccess:(data)=>{
            localStorage.setItem('token',data.tokem)
            localStorage.setItem('userId',data.user.userId)
            console.log(data);
        },
        onError:(err)=>{
            console.log(err);
        }
    })

    return (
        <AuthContext.Provider value={{loginUser}}>
            {children}
        </AuthContext.Provider>
    )
}