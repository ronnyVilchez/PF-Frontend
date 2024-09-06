import axios from "axios"

export const Auth = async (data)=> {
   const log = await axios.post('https://pf-backend-bdj3.onrender.com/api/auth/login',data)
   return log.data
}

export const infoUs = async ()=> {
   const token = localStorage.getItem('token')
   const log = await axios.get('https://pf-backend-bdj3.onrender.com/api/auth/me',{
      headers: {Authorization: token} 
   })
   return log.data
}