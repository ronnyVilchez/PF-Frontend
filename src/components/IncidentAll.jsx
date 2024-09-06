
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContex'
import dayjs from 'dayjs';

export const IncidentAll = () => {
    const { reportAll, updateStatus, delReport } = useContext(AdminContext)
    const [expandedId, setExpandedId] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (reportAll)
            setReports(reportAll)
    }, [reportAll])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleRowClick = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleUpdate = async (e, id) => {
        localStorage.setItem('idR', id)

        const data = new FormData()
        data.append('status', e.target.value)

        await updateStatus.mutateAsync(data)
    }
    const handleDelete = async (id) => {

        await delReport.mutateAsync(id)
    }

    const statusFilter = (e) => {

        if (e.target.value === '') {
            setReports(reportAll)
        } else {
            const filterArray = reportAll.filter((rp) => rp.status === e.target.value)
            setReports(filterArray);

        }
        console.log(reports);
    }

    function filterDesde(e) {

        const fecha = dayjs(e.target.value).format('YYYY-MM-DD')

        const filterArray = reportAll.filter((rp) => dayjs(rp.date).format('YYYY-MM-DD') >= fecha)
        setReports(filterArray);
    }

    function filterHasta(e) {
        const fecha = dayjs(e.target.value).format('YYYY-MM-DD')

        const filterArray = reportAll.filter((rp) => dayjs(rp.date).format('YYYY-MM-DD') <= fecha)
        setReports(filterArray);
    }


    return (
        <section className='w-full h-screen flex flex-col gap-4 '>
            <section className='w-full flex flex-row items-center justify-between'>
                <h2 className='text-[1.3rem] text-center'>Estos son tus reportes</h2>
                <section className=' flex flex-row items-center gap-4'>
                    <label >Filtrar por: <select className='rounded-xl outline-none text-black' type="text" onChange={statusFilter} >
                        <option value="" >Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="progreso">Progreso</option>
                        <option value="resuelto">Resuelto</option>
                    </select></label>

                    <section className='' >
                        <label >
                            Desde:
                            <input className='text-black px-1' onChange={filterDesde} type="date" />
                        </label>
                        <label >
                            Hasta:
                            <input className='text-black px-1' onChange={filterHasta} type="date" />
                        </label>
                    </section>
                </section>
            </section>
            <section className="overflow-x-auto w-full"> 
            <table className="min-w-full h-fit  bg-white bg-opacity-70 border border-orange-200">
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
                                    <td className="py-2 px-4 text-center">
                                        <select required className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] cursor-pointer text-black font-normal' type="text" name='status' defaultValue={item.status}
                                            onChange={(e) => handleUpdate(e, item.id)}
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="progreso">Progreso</option>
                                            <option value="resuelto">Resuelto</option>
                                        </select>


                                    </td>
                                    <td className="py-2 px-4 text-center cursor-pointer" colSpan={2} onClick={() => handleRowClick(item.id)}>
                                        <span className="text-orange-400 hover:underline">
                                            {(expandedId === item.id) ? ` Mostrar menos` : ` Mostrar más`}
                                        </span>
                                    </td>
                                </tr>
                                {expandedId === item.id && (
                                    <>
                                        <tr className="bg-white bg-opacity-70 text-black">
                                            <td colSpan="2" className="p-4">
                                                <h3 className="font-bold mb-2">Fotos:</h3>
                                                <section className="flex flex-row gap-2 justify-around">
                                                    {item.imagens &&
                                                        JSON.parse(item.imagens).map((img, index) => (
                                                            <img key={index} src={`https://pf-backend-bdj3.onrender.com/api/incident/i/${img}`} alt={`${img}`} className="w-24 h-24 object-cover rounded" />
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
                                            <td colSpan="1" className="py-2 px-4 text-center">

                                                <button className="text-orange-400 hover:underline" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                        <tr>


                                        </tr>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
            </section>
        </section>
    )
}
