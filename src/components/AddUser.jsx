
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContex';

export const AddUser = () => {
    const { createUser } = useContext(AdminContext)

    async function sendUser(e) {
        e.preventDefault()

        const data = Object.fromEntries(
            new FormData(e.target)
        )
        await createUser.mutateAsync(data)
        e.target.reset();
    }

    return (
        <section className='w-full flex flex-col text-[1.2rem] gap-4 '>
            <h2 className='font-semibold'>Crear un nuevo usuario</h2>
            <span className='text-[1rem]'>Porfavor llene cada espacio para crear el nuevo usuario</span>
            <form className='border-[1px] text-[1.1rem] border-gray-200 flex flex-col rounded-2xl p-6 gap-4 bg-slate-400 bg-opacity-70 font-semibold' onSubmit={sendUser} >

                <label className='  p-2 flex flex-col py-4 items-start ' > Nombre:<input placeholder='Nombre de nuevo usuario' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="text" name='nombre' /></label>

                <label className=' p-2 flex flex-col py-4 items-start' > Apellido: <input placeholder='Apellido de nuevo usuario' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="text" name='apellido' /></label>

                <label className='  p-2 flex flex-col py-4 items-start uppercase'> dni: <input placeholder='DNI de nuevo usuario' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="number" min={10000000}  name='dni' /></label>

                <label className='  p-2 flex flex-col py-4 items-start '> Telefono: <input placeholder='Telefono de nuevo usuario' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="tel" name='telefono' /></label>

                <label className=' p-2 flex flex-col py-4 items-start' > Rol: <select className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem]  text-black font-normal' type="text" name='rol'>
                    <option value="administrador">Administrador</option>
                    <option value="residente">Residente</option>

                </select>
                </label>

                <label className=' p-2 flex flex-col py-4 items-start' > Correo: <input className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem]  text-black font-normal ' type="email" name='email' placeholder='Correo de nuevo usuario' /></label>

                <label className=' p-2 flex flex-col py-4 items-start' > Usuario: <input className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem]  text-black font-normal ' type="text" name='usuario' placeholder='Usuario con el que ingresara a la Pagina' /></label>

                <label className=' p-2 flex flex-col py-4 items-start' > Contraseña: <input className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem]  text-black font-normal ' type="text" name='password' placeholder='Contraseña con la que ingresara a la Pagina' /></label>

                <button className='bg-orange-400 rounded-lg h-[3rem] text-white font-semibold' type='submit'>Crear Usuario</button>
            </form>
        </section>
    )
}

