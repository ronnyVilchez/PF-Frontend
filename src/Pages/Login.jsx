import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'
import { Link } from 'wouter'

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
        <main className={`flex flex-col h-screen w-full p-8 bg-[url('/images/bg-main.jpg')] bg-cover font-Noto-Sans `}>
            <h1 className=' sm:absolute text-white font-semibold text-[4.5vw] sm:text-[5vh] text-center w-full'>
                BIENVENIDO A LA PAGINA DE REPORTES DE <br /> "CONDOMINIOS LOS PORTALES S.A.A"</h1>
            <section className='flex m-auto '>
                <form className='flex flex-col gap-14 border-[1px] rounded-xl p-8 bg-white bg-opacity-70'>
                    <section className='flex flex-col gap-8 '>
                        <label className='font-semibold w-[15rem] h-[2.5rem] flex flex-col gap-2 '>Usuario: <input className=' rounded-lg font-normal outline-none py-1 px-3' name='usuario' type="text" /></label>

                        <label className='font-semibold w-[15rem] h-[2.5rem] flex flex-col gap-2 '>Contraseña:
                            <input className=' rounded-lg font-normal outline-none py-1 px-3' name='password' type="text" /></label>

                    </section>
                    <Link to='/dashboard'  className='bg-orange-400 rounded-lg h-[2.5rem] text-white font-semibold' >Ingresar</Link>
                </form>
            </section>
        </main>
    )
}
