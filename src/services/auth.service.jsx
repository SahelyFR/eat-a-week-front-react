import { useState, useEffect } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../utils/context"
import axios from "axios"
import { BASEURL } from "../utils/constants"

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}


export function RegisterUser() {
  const url = `${BASEURL}/auth/register`
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
    
  useEffect(() => {
  
    if (!url) return
  
    async function fetchData() {
      try {
        const response = await axios(url, {
          headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin'
          }
        })

        const newUser = await response
        setData(newUser)
        if(response.status > 299){
          setError(true)
        } 
      }
      catch(err) {
        console.log(err)
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }

    setLoading(true)
    fetchData()
  }, [url])
  
  return { isLoading, data, error }
}
