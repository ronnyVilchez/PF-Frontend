import React from 'react'
import { Link } from 'wouter'

export const Navbar = () => {
  return (
    <nav className=' flex flex-row bg-orange-400 w-full h-[10%] items-center px-8 py-4 justify-between text-white font-semibold'>
      <figure className='flex flex-row items-center gap-8'>
        <Link to='/dashboard'>
          <img src="/images/building.svg" alt="logo" />
        </Link>
        <figcaption className='text-[2rem]'>SERVICIO DE INCIDENCIAS</figcaption>
      </figure>
      <section className='flex flex-row gap-4 text-[1.2rem]'>
        <Link to='usuarios'>Usuarios</Link>
        <Link to='incidencias'>Incidencias</Link>
        <button>Logout</button>
      </section>
    </nav>
  )
}
