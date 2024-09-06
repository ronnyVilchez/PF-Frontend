import React from 'react'
import { useLocation } from 'wouter'

export const ProtectRouter = ({ children }) => {
    const [, setLocation] = useLocation()
    const token = localStorage.getItem('token')


    if (!token) { return setLocation('/login') }


    return children

}
