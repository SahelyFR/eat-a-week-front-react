import axios from 'axios'
import { useState, useEffect } from 'react'
import { SEASONS } from "../constants"

export function useFetch(url) {

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
  }, [url])
  
  return { isLoading, data, error }
  
}

export function useToken(){
  return JSON.parse(localStorage.getItem('user')).token
}

export default function useSeason(){
  let mySeason = 0
  const today = getToday()

  SEASONS.forEach((saison) => {
    if(today >= saison.startDay && today < saison.endDay){
      mySeason = saison.name;
    }
  })
  return mySeason
}

function getToday(){
  var now = new Date()
  var start = new Date(now.getFullYear(), 0, 0)
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
  var oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}