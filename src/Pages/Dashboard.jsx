import React, { useContext } from 'react'
import { Link, Route, Switch, useLocation } from 'wouter'
import { Report } from '../components/Report'
import { Incident } from '../components/Incident'
import { Help } from '../components/Help'
import { OpcionesUser } from '../components/OpcionesUser'
import { OpcionesAdm } from '../components/OpcionesAdm'
import { AdminContext } from '../context/AdminContex'
import { AuthContext } from '../context/AuthContex'
import { Users } from '../components/Users'
import { IncidentAll } from '../components/IncidentAll'
import { AddUser } from '../components/AddUser'
import { EditIncident } from '../components/EditIncident'
import { EditUser } from '../components/EditUser'
import { InfoUser } from '../components/InfoUser'

export const Dashboard = () => {
    const { infoUser } = useContext(AuthContext)
    const [location] = useLocation()

    return (
        <main className={`${(location === '/dashboard') ? 'h-screen' : 'h-full'} flex flex-col  w-full p-8 gap-8 bg-[url('/images/bg-main.jpg')] bg-cover text-white font-Noto-Sans`}>
            <h2 className='text-[2.2rem] text-center font-semibold'>Bienvenido al sistema de incidencias del edificio "Los Portales"</h2>
            <section className='flex flex-col w-full gap-6 '>
                <h2 className='text-[1.8rem] text-center'>¿Que desea hacer hoy?</h2>
                {infoUser &&
                    <>
                        {infoUser.rol === 'administrador' && (<OpcionesAdm />)}
                        {infoUser.rol === 'residente' && (<OpcionesUser />)}
                    </>

                }
                <section className='w-full py-4 px-10'>
                <Route path="/dashboard" component={InfoUser} />
                    <Route path="/dashboard/report" component={Report} />
                    <Route path="/dashboard/incident" component={Incident} />
                    <Route path="/dashboard/help" component={Help} />

                    <Route path="/dashboard/users" component={Users} />
                    <Route path="/dashboard/incidentAll" component={IncidentAll} />
                    <Route path="/dashboard/create" component={AddUser} />
                    <Route path="/dashboard/edit" component={EditIncident} />
                    <Route path="/dashboard/profile" component={EditUser} />
                </section>

            </section>

        </main>
    )
}
