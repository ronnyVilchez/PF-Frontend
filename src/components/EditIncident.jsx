import dayjs from 'dayjs';
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContex';

export const EditIncident = () => {
    const [error, setError] = useState('');
    const { updateReportUs, reportFOne } = useContext(AdminContext)

    const userId = localStorage.getItem('userId')

    console.log(reportFOne);
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 3) {
            setError('Puedes seleccionar un máximo de 3 imágenes.');
            e.target.value = null;
        } else {
            setError('');
        }
    };

    async function updateHandleReport(e) {
        e.preventDefault()

        const date = dayjs().format()
        const data = new FormData(e.target)
        data.append('date', date)
        data.append('userId', userId)

        await updateReportUs.mutateAsync(data)
    }

    return (
        <section className='w-full flex flex-col text-[1.2rem] gap-4 '>
            <h2 className='font-semibold'>Edita tú reporte aqui:</h2>
            <span className='text-[1rem]'>Agrega o modifica tú reporte</span>
            {reportFOne &&
                reportFOne.map((rp) => (
                    <form key={rp.id} className='border-[1px] text-[1.1rem] border-gray-200 flex flex-col rounded-2xl p-6 gap-4 bg-slate-400 bg-opacity-70 font-semibold' onSubmit={updateHandleReport} >
                        <label className='  p-2 flex flex-col py-4 items-start ' > Asunto:<input required  placeholder='Agrege el titulo del problema' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="text" name='title' defaultValue={rp.title} /></label>

                        <label className=' p-2 flex flex-col py-4 items-start' > Descripción: <input required placeholder='Realice una breve descripción' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="text" name='description' defaultValue={rp.description} /></label>

                        <label className='  p-2 flex flex-col py-4 items-start'> Ubicación: <input required placeholder='Especifique la ubicación del problema. Ejm: Edificio A, 4to piso.' className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem] text-black font-normal' type="text" name='ubication' defaultValue={rp.ubication} /></label>

                        <label className=' p-2 flex flex-col py-4 items-start' > Tipo: <select required   defaultValue={rp.type} className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem]  text-black font-normal' type="text" name='type'>
                            <option value="plomeria">Plomeria</option>
                            <option value="electricidad">Electricidad</option>
                            <option value="estructural">Estructural</option>
                            <option value="exteriores">Exteriores</option>
                            <option value="paredes,pisos y techo">Paredes,pisos y techo</option>
                            <option value="ascensores">Ascensores</option>
                            <option value="otros">Otros</option>
                        </select>
                        </label>
                        <label className=' p-2 flex flex-col py-4 items-start' > Estado: <select required   className='px-4 outline-none rounded-xl bg-orange-100 w-full h-[3rem]  text-black font-normal uppercase' type="text" name='status' defaultValue={rp.status}>
                            <option value="pendiente">Pendiente</option>
                            <option value="progreso">Progreso</option>
                            <option value="resuelto">Resuelto</option>
                        </select></label>

                        <label className=' px-4 bg-orange-100  flex flex-col py-4 items-start justify-center h-[fit] rounded-xl w-full text-black' > Seleccione maximo 3 fotos(Opcional).
                            <input  className='px-4 outline-none text-black font-normal h-[3rem]  ' type="file" name="imagenes" accept="image/*" multiple onChange={handleFileChange} 
                            />
                            <section className='flex flex-row gap-8'>
                            { JSON.parse(rp.imagens).map((img,i)=>(
                                <figure key={i}>
                                    <img src={`http://localhost:3000/api/incident/i/${img}`} alt={`${img}`} className="w-24 h-24 object-cover rounded" />
                                </figure>
                            ))

                            }
                            </section>
                            {error && <p className='text-red-500 px-2'>{error}</p>}
                        </label>

                        <button className='bg-orange-400 rounded-lg h-[3rem] text-white font-semibold' type='submit'>Guardar Edicion</button>
                    </form>
                ))}
        </section>
    )
}
