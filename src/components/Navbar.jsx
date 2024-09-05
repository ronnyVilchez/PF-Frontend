import React, { useContext } from 'react'
import { Link } from 'wouter'
import { AuthContext } from '../context/AuthContex'

export const Navbar = () => {
  const { infoUser,logout } = useContext(AuthContext)
  console.log(infoUser);
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
           { infoUser.rol === 'administrador' &&( <Link to='/profile'>Administrador: {infoUser.nombre}</Link>)}
           { infoUser.rol === 'residente' &&  (<Link to='/profile'>Residente: {infoUser.nombre}</Link>)}
          </>
        }
        <button onClick={logout}>Salir</button>
      </section>
    </nav>
  )
}
