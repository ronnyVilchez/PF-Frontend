import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContex'

export const Help = () => {
  const { adminAll } = useContext(AdminContext)

  return (
    <section className='w-full h-screen flex flex-col gap-4'>
      <h2 className='text-[1.3rem] text-center'  >Nuestro equipo de administradores esta para ayudarle</h2>
      <section className="overflow-x-auto w-full">
        <table className="min-w-full bg-white bg-opacity-70 border border-orange-200">
          <thead>
            <tr className="w-full bg-orange-100 border-b border-orange-200">
              <th className="py-2 px-4 text-center text-gray-600">Nombre</th>
              <th className="py-2 px-4 text-center text-gray-600">Apellido</th>
              <th className="py-2 px-4 text-center text-gray-600">Telefono</th>
              <th className="py-2 px-4 text-center text-gray-600">Correo</th>
            </tr>
          </thead>
          <tbody>
            {adminAll &&
              adminAll.map((item) => (
                <tr key={item.userId} className="border-b border-orange-200 text-black">
                  <td className="py-2 px-4 text-center">{item.nombre}</td>
                  <td className="py-2 px-4 text-center">{item.apellido}</td>
                  <td className="py-2 px-4 text-center">{item.telefono}</td>
                  <td className="py-2 px-4 text-center">{item.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}
