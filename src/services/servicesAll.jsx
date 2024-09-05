import axios from "axios"

export const usersAll = async ()=> {
   const users = await axios.get('http://localhost:3000/api/user/all')
   return users.data
}
export const reportesAll = async ()=> {
   const report = await axios.get('http://localhost:3000/api/incident/all')
   return report.data
}
export const createRpt = async (data)=> {
   const report = await axios.post('http://localhost:3000/api/incident/',data)
   return report.data
}