import axios from "axios"

export const Auth = async (data)=> {
   const log = await axios.post('http://localhost:3000/api/auth/login',data)
   return log.data
}