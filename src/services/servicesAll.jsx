import axios from "axios"

export const usersAll = async ()=> {
   const users = await axios.get('http://localhost:3000/api/user/all')
   return users.data
}
export const reportesAll = async ()=> {
   const report = await axios.get('http://localhost:3000/api/incident/all')
   return report.data
}
export const reportesUser = async ()=> {
    const userId = localStorage.getItem('userId')
   const reportUs = await axios.get(`http://localhost:3000/api/incident/u/${userId}`)
   return reportUs.data
}
export const createRpt = async (data)=> {
   const report = await axios.post('http://localhost:3000/api/incident/',data)
   return report.data
}
export const updateReport = async (data)=> {
    const idR = localStorage.getItem('idR')
   const report = await axios.patch(`http://localhost:3000/api/incident/${idR}`,data)
   return report.data
}
export const deleteReport = async (id)=> {
   const report = await axios.delete(`http://localhost:3000/api/incident/${id}`)
   return report.data
}

export const createUs = async (data)=> {
    const newUs = await axios.post('http://localhost:3000/api/user/',data)
    return newUs.data
 }
 
 export const deleteUser = async (id)=> {
    const delUser = await axios.delete(`http://localhost:3000/api/user/${id}`)
    return delUser.data
 }
 