import React from 'react'
import { Link } from 'wouter'

export const OpcionesUser = () => {
    return (
        <section className='grid grid-cols-3 text-black font-semibold w-full gap-4 justify-items-center'>
            <Link className='w-fit h-[4rem] flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/report' >Reportar una problema</Link>
            <Link className='w-fit h-[4rem] flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/incident' >Ver mis reportes</Link>
            <Link className='w-fit h-[4rem] flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/help' >Contactarme con un Administrador</Link>
        </section>
    )
}
