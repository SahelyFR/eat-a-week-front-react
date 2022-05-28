import axios from 'axios'
import { useState, useEffect } from 'react'

export function useFetch(url) {

  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const bearerToken = useToken()
    
  useEffect(() => {
  
    if (!url) return
  
    async function fetchData() {
      try {
        const response = await axios(url, {
          headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Authorization': bearerToken
          }
        })

        const returnedData = await response
        setData(returnedData)
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
  }, [url, bearerToken])
  
  return { isLoading, data, error }
  
}

export function useToken(){
  return JSON.parse(localStorage.getItem('user')).token
}