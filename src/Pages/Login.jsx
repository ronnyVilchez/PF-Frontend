import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'

export const Login = () => {
    const { loginUser } = useContext(AuthContext)

    async function handleLog(e) {
        e.preventDefault()
        const formData = Object.fromEntries(
            new FormData(e.target)
        )
        await loginUser.mutateAsync(formData)
    }

    return (
        <form onSubmit={handleLog}>
            <label>Usuario: <input name='usuario' type="text" /></label>
            <label>Contraseña: <input name='password' type="text" /></label>
            <button type='submit' >Ingresar</button>
        </form>
    )
}
