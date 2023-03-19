import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { SEASONS } from "../constants"
import { useAuth } from '../context'

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
  const auth = useAuth()
  const navigate = useNavigate()

  const storedData = JSON.parse(localStorage.getItem('user'))
  console.log(`Expires : ${storedData.expires} // Now() : ${Date.now()}`)
  if(storedData.expires > Date.now()){
    return storedData.token
  }else{
    auth.signout()
    navigate("/")
  }
}

export default function useSeason(){
  let mySeason = "all"
  const today = getToday()

  SEASONS.forEach((saison) => {
    const test = (today >= saison.startDay && today < saison.endDay) || (saison.name === "winter" && (today >= saison.startDay || today < saison.endDay))
    console.log(`Is (${today} >= ${saison.startDay} && ${today} < ${saison.endDay}) || (${saison.name} === "winter" && (${today} >= ${saison.startDay} || ${today} < ${saison.endDay})) ? Answer : ${test}`)
    if (test) {
      mySeason = saison.name
      console.log(saison.name)
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