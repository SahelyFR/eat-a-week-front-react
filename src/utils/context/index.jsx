import { useContext, createContext, useState } from "react"
import axios from "axios"
import { SEASONS } from "../constants"

let AuthContext = createContext(null)

export function AuthProvider({ children }) {
  let [user, setUser] = useState()
  let [isAuthenticated, setAuthenticated] = useState(false)

  let signin = (username, password, callback) => {
    axios.get('http://localhost:8080/login', {
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'username': btoa(username),
        'password': btoa(password)
      }
    }).then(res => {
      setUser({
        username: username,
        role: res.headers.authority
      })
      setAuthenticated(true)
      localStorage.setItem('user',JSON.stringify({
        user: username,
        token: res.headers.authorization,
        expires: Date.now() +7200 * 1000
      }))
      callback(res)
    }, (reject) => {
      setUser(null)
      setAuthenticated(false)
      callback(reject)
    })

  }

  let signout = (callback) => {
    setUser(null)
    localStorage.removeItem('user')
    callback()
  }

  let value = { user, isAuthenticated, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


let SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [season, setSeason] = useState(0)

  const PRINTEMPS = SEASONS[0].startDay
  const ETE = SEASONS[1].startDay
  const AUTOMNE = SEASONS[2].startDay
  const HIVER = SEASONS[3].startDay
  const currentDay = new Date().getDay()
  let mySeason = 0
    
  if(currentDay >= PRINTEMPS && currentDay < ETE){
    mySeason = 1;
  }else if(currentDay >= ETE && currentDay < AUTOMNE){
    mySeason = 2;
  } else if(currentDay >= AUTOMNE && currentDay < HIVER){
    mySeason = 3;
  } else if(currentDay >= HIVER || currentDay < PRINTEMPS){
    mySeason = 4;
  }
  setSeason(mySeason);
  
  return <SeasonContext.Provider value={season}>{children}</SeasonContext.Provider>
}

export function useSeason() {
  return useContext(SeasonContext)
}