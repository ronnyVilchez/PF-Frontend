import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContex'

export const Incident = () => {
    const { reportFrUs , delReport } = useContext(AdminContext)
    const [expandedId, setExpandedId] = useState(null);
    console.log(reportFrUs);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleRowClick = (id) => {
        setExpandedId(expandedId === id ? null : id); // Toggle row
    };

    const handleUpdate = async (e, id) => {
        /* localStorage.setItem('idR', id)

        const data = new FormData()
        data.append('status', e.target.value)

        await updateStatus.mutateAsync(data) */
    }
    
    const handleDelete = async (id) => {

        await delReport.mutateAsync(id)
    }

    return (
        <section className='w-full h-screen flex flex-col gap-4 '>
            <h2 className='text-[1.3rem] text-center'>Estos son tus reportes</h2>
            <table className="min-w-full  bg-white bg-opacity-70 border border-orange-200">
                <thead>
                    <tr className="w-full bg-orange-100 border-b border-orange-200">
                        <th className="py-2 px-4 text-center text-gray-600">Titulo</th>
                        <th className="py-2 px-4 text-center text-gray-600">Ubicacion</th>
                        <th className="py-2 px-4 text-center text-gray-600">Tipo</th>
                        <th className="py-2 px-4 text-center text-gray-600">Estado</th>
                        <th className="py-2 px-4 text-center text-gray-600"></th>
                        <th className="py-2 px-4 text-center text-gray-600"></th>
                    </tr>
                </thead>
                <tbody>
                    {reportFrUs &&
                        reportFrUs.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr
                                    className="relative text-black border-b border-orange-200 cursor-pointer"
                                    onClick={() => handleRowClick(item.id)}
                                >
                                    <td className="py-2 px-4 text-center">{item.title}</td>
                                    <td className="py-2 px-4 text-center">{item.ubication}</td>
                                    <td className="py-2 px-4 text-center">{item.type}</td>
                                    <td className="py-2 px-4 text-center">{item.status}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span className="text-orange-400 hover:underline">
                                        {(expandedId===item.id) ? ` Mostrar menos` :  ` Mostrar más`   }</span>
                                    </td>
                                </tr>
                                {expandedId === item.id && (
                                    <>
                                        <tr className="bg-white bg-opacity-70 text-black min-h-32">
                                            <td colSpan="2" className="p-4">
                                                <h3 className="font-bold mb-2">Fotos:</h3>
                                                <section className="flex flex-row gap-2 justify-around">
                                                    {item.imagens &&
                                                        JSON.parse(item.imagens).map((img, index) => (
                                                            <img key={index} src={`http://localhost:3000/api/incident/i/${img}`} alt={`${img}`} className="w-24 h-24 object-cover rounded" />
                                                        ))}
                                                </section>
                                            </td>
                                            <td colSpan="2" className="py-2 px-4 text-center">
                                                <section>
                                                    <h3 className="font-bold mb-2">Descripción:</h3>
                                                    <p> {item.description}</p>
                                                </section>
                                            </td>
                                            <td colSpan="1" className="py-2 px-4 text-center">
                                                <section>
                                                    <h3 className="font-bold mb-2">Fecha:</h3>
                                                    <p> {formatDate(item.date)} </p>
                                                </section>
                                            </td>
                                            <td colSpan="1" className="py-2 px-4 text-center flex flex-col justify-center items-center min-h-[10rem] gap-4">

                                                <button className="text-orange-400 hover:underline" onClick={() => handleUpdate(item.id)}>Editar</button>
                                                <button className="text-orange-400 hover:underline" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                       
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </section>
    )
}
