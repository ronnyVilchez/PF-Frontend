import React, { useContext } from 'react'
import { Link } from 'wouter'
import { AuthContext } from '../context/AuthContex'

export const Navbar = () => {
  const { infoUser, logout } = useContext(AuthContext)
  return (
    <nav className=' flex flex-row bg-orange-400 bg-opacity-90 w-full h-[10%] items-center px-8 py-4 justify-between text-white font-semibold'>
      <figure className='flex flex-row items-center gap-8'>
        <Link to='/dashboard'>
          <img src="/images/building.svg" alt="logo" />
        </Link>
        <figcaption className='text-[2rem]'>SERVICIO DE INCIDENCIAS</figcaption>
      </figure>
      <section className='flex flex-row gap-12 text-[1.2rem]'>
        {
          infoUser &&
          <>
            {infoUser.rol === 'administrador' && (
              <section className='flex flex-col items-center'>
                <span >Administrador: {infoUser.nombre}</span>
                <Link to='/dashboard/profile' className='text-[0.8rem] font-normal cursor-pointer hover:underline text-orange-100'>Editar Perfil</Link>
              </section>
            )}
            {infoUser.rol === 'residente' && (
              <section className='flex flex-col items-center'>
                <span >Residente: {infoUser.nombre}</span>
                <Link to='/dashboard/profile' className='text-[0.8rem] font-normal cursor-pointer hover:underline text-orange-100'>Editar Perfil</Link>
              </section>
            )}

          </>
        }
        <button onClick={logout}>Salir</button>
      </section>
    </nav>
  )
}
