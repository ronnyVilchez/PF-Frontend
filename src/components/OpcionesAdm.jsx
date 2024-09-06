import React from 'react'
import { Link } from 'wouter'

export const OpcionesAdm = () => {
    return (
        <section className='flex flex-col items-center sm:grid sm:grid-cols-3 text-black font-semibold w-full gap-4 sm:justify-items-center'>
            <Link className='w-fit h-[4rem] shadow-lg flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/users' >Todos los usuarios</Link>
            <Link className='w-fit h-[4rem] shadow-lg flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/incidentAll' >Todos los reportes</Link>
            <Link className='w-fit h-[4rem] shadow-lg flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/create' >Crear Usuario</Link>
        </section>
    )
}
