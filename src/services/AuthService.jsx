import axios from "axios"

export const Auth = async (data)=> {
   const log = await axios.post('https://pf-backend-bdj3.onrender.com/api/auth/login',data)
   return log.data
}