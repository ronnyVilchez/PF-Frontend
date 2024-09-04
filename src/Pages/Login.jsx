import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'

export const Login = () => {
    const {loginUser} = useContext(AuthContext)

   async function handleLog(e) {
        e.preventDefault()
        const usuario = e.target.usuario.value
        const password = e.target.password.value

        const dataLog = {
            usuario,
            password
        }
        await loginUser.mutateAsync(dataLog)
     
    }

    return (
        <form onSubmit={handleLog}>
            <label>Usuario: <input name='usuario' type="text" /></label>
            <label>Contraseña: <input name='password' type="text" /></label>
            <button type='submit' >Ingresar</button>
        </form>
    )
}
