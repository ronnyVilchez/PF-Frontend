import React from 'react'
import { Link, Route, Switch, useLocation } from 'wouter'
import { Report } from '../components/Report'
import { Incident } from '../components/Incident'
import { Help } from '../components/Help'

export const Dashboard = () => {

    return (
<main className={`flex flex-col h-full w-full p-8 gap-8 bg-[url('/images/bg-main.jpg')] bg-cover text-white `}>
            <h2 className='text-[2.2rem] text-center font-semibold'>Bienvenido al sistema de incidencias del edificio "Los Portales"</h2>
            <section className='flex flex-col w-full gap-6 '>
                <h2 className='text-[1.8rem] text-center'>¿Que desea hace hoy?</h2>
                <section className='grid grid-cols-3 text-black font-semibold w-full gap-4 justify-items-center'>
                    <Link className='w-fit h-[4rem] flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/report' >Reportar una problema</Link>
                    <Link className='w-fit h-[4rem] flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/incident' >Ver mis reportes</Link>
                    <Link className='w-fit h-[4rem] flex items-center p-4 rounded-xl bg-orange-300' to='/dashboard/help' >Contactarme con un Administrador</Link>
                </section>
                <section className='w-full py-4 px-10'>
                    <Route path="/dashboard/report" component={Report} />
                    <Route path="/dashboard/incident" component={Incident} />
                    <Route path="/dashboard/help" component={Help} />
                </section>

            </section>

        </main>
    )
}
