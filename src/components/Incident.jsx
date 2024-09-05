import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContex'
import { Link } from 'wouter';
import dayjs from 'dayjs';

export const Incident = () => {
    const { reportFrUs, delReport } = useContext(AdminContext)
    const [expandedId, setExpandedId] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (reportFrUs)
            setReports(reportFrUs)
    }, [reportFrUs])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleRowClick = (id) => {
        setExpandedId(expandedId === id ? null : id); // Toggle row
    };

    const handleUpdate = async (id) => {
        localStorage.setItem('idIn', id)
    }

    const handleDelete = async (id) => {

        await delReport.mutateAsync(id)
    }

    const statusFilter = (e) => {

        if (e.target.value === '') {
            setReports(reportFrUs)
        } else {
            const filterArray = reportFrUs.filter((rp) => rp.status === e.target.value)
            setReports(filterArray);

        }
    }

    function filterDesde(e) {
      
        const fecha = dayjs(e.target.value).format('DD/MM/YYYY')

        const filterArray = reportFrUs.filter((rp) => dayjs(rp.date).format('DD/MM/YYYY') >= fecha)
        setReports(filterArray);
    }

    function filterHasta(e) {
        const fecha = dayjs(e.target.value).format('DD/MM/YYYY')

        const filterArray = reportFrUs.filter((rp) => dayjs(rp.date).format('DD/MM/YYYY') <= fecha)
        setReports(filterArray);
    }

    return (
        <section className='w-full h-screen flex flex-col gap-4 '>
            <section className='w-full flex flex-row items-center justify-between'>
                <h2 className='text-[1.3rem] text-center'>Estos son tus reportes</h2>
                <section className=' flex flex-row items-center gap-4'>
                    <label >Estado: <select className='rounded-xl outline-none text-black' type="text" onChange={statusFilter} >
                        <option value="" >Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="progreso">Progreso</option>
                        <option value="resuelto">Resuelto</option>
                    </select></label>

                    <label className='' >Fecha: Desde
                        <input className='text-black px-1' onChange={filterDesde} type="date" />
                        Hasta
                        <input className='text-black px-1' onChange={filterHasta} type="date" />
                    </label>


                </section>
            </section>
            <table className="min-w-full  bg-white bg-opacity-70 border border-orange-200">
                <thead>
                    <tr className="w-full bg-orange-100 border-b border-orange-200">
                        <th className="py-2 px-4 text-center text-gray-600">Asunto</th>
                        <th className="py-2 px-4 text-center text-gray-600">Ubicacion</th>
                        <th className="py-2 px-4 text-center text-gray-600">Tipo</th>
                        <th className="py-2 px-4 text-center text-gray-600">Estado</th>
                        <th className="py-2 px-4 text-center text-gray-600"></th>
                        <th className="py-2 px-4 text-center text-gray-600"></th>
                    </tr>
                </thead>
                <tbody>
                    {reports &&
                        reports.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr
                                    className="relative text-black border-b border-orange-200 "

                                >
                                    <td className="py-2 px-4 text-center">{item.title}</td>
                                    <td className="py-2 px-4 text-center">{item.ubication}</td>
                                    <td className="py-2 px-4 text-center">{item.type}</td>
                                    <td className="py-2 px-4 text-center">{item.status}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span onClick={() => handleRowClick(item.id)} className="text-orange-400 cursor-pointer hover:underline">
                                            {(expandedId === item.id) ? ` Mostrar menos` : ` Mostrar más`}</span>
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

                                                <Link to={`/dashboard/edit`} onClick={() => handleUpdate(item.id)} className="text-orange-400 cursor-pointer hover:underline">Editar</Link>

                                                <button className="text-orange-400 cursor-pointer hover:underline" onClick={() => handleDelete(item.id)}>Eliminar</button>
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
