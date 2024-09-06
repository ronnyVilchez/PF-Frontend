import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'

export const InfoUser = () => {
    const { infoUser } = useContext(AuthContext)

    return (
        <>
            {infoUser &&

                (<section className='w-full h-fit flex flex-col text-orange-500 bg-orange-100 bg-opacity-85 p-8 gap-2 rounded-xl right-0 top-[6rem] '>
                    <figure className='flex flex-row items-center w-full justify-evenly'>
                        <img src="/images/arrowLT.svg" alt="arrowLT" width={150} />
                        <img src="/images/arrowUP.svg" alt="arrowUP" width={150} />
                        <img src="/images/arrowRGT.svg" alt="arrowRGT" width={150} />
                    </figure>

                   <h2 className='font-semibold text-[2rem] text-center'>Información de tú Perfil</h2>
                    <section className='flex flex-col gap-2 px-8'>
                    <h2  className='font-semibold text-[1.5rem]'>Datos Personales</h2>

                    <span className='text-[1.2rem]'><strong>Nombre: </strong>{infoUser.nombre}</span>
                    <span className='text-[1.2rem]'><strong>Apellido: </strong>{infoUser.apellido}</span>
                    <span className='text-[1.2rem]'><strong>DNI: </strong>{infoUser.dni}</span>
                    <span className='text-[1.2rem]'><strong>Telefono: </strong>{infoUser.telefono}</span>
                    <span className='text-[1.2rem]'><strong>Correo: </strong>{infoUser.email}</span>
                    <span className='text-[1.2rem]'><strong>Usuario: </strong>{infoUser.usuario}</span>
                    </section>
                   
                </section>)
            }
        </>
    )
}
