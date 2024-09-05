
import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContex'

export const Users = () => {
    const {userAll,delUser} = useContext(AdminContext)

  async  function handleDelUs(id) {
        await delUser.mutateAsync(id)
    }

  return (
    <section className='w-full h-screen flex flex-col gap-4'>
        <h2 className='text-[1.3rem] text-center'  >Lista de usuarios registrados</h2>
        <table className="min-w-full bg-white bg-opacity-70 border border-orange-200">
        <thead>
          <tr className="w-full bg-orange-100 border-b border-orange-200">
            <th className="py-2 px-4 text-center text-gray-600">Nombre</th>
            <th className="py-2 px-4 text-center text-gray-600">Apellido</th>
            <th className="py-2 px-4 text-center text-gray-600">Telefono</th>
            <th className="py-2 px-4 text-center text-gray-600">Dni</th>
            <th className="py-2 px-4 text-center text-gray-600">Correo</th>
            <th className="py-2 px-4 text-center text-gray-600">Rol</th>
            <th className="py-2 px-4 text-center text-gray-600">Usuario</th>
            <th className="py-2 px-4 text-center text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {userAll && 
          userAll.map((item) => (
            <tr key={item.userId} className="border-b border-orange-200 text-black">
              <td className="py-2 px-4 text-center">{item.nombre}</td>
              <td className="py-2 px-4 text-center">{item.apellido}</td>
              <td className="py-2 px-4 text-center">{item.telefono}</td>
              <td className="py-2 px-4 text-center">{item.dni}</td>
              <td className="py-2 px-4 text-center">{item.email}</td>
              <td className="py-2 px-4 text-center">{item.rol}</td>
              <td className="py-2 px-4 text-center">{item.usuario}</td>
              <td className="py-2 px-4 text-center">
                <button className="text-orange-400 hover:underline" onClick={()=> handleDelUs(item.userId)}>Eliminar</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
