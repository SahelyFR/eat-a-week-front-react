import axios from 'axios'
import { useState, useEffect } from 'react'

export function useFetch(url) {

  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const bearerToken = JSON.parse(localStorage.getItem('user')).token
    
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

        const data = await response
        setData(data)
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