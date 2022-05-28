import { useContext, createContext, useState } from "react"
import axios from "axios"

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
      setUser(username)
      setAuthenticated(true)
      localStorage.setItem('user',JSON.stringify({
        user: username,
        token: res.headers.authorization
      }))
      callback(res)
    }, (reject) => {
      setUser(null)
      setAuthenticated(false)
      callback(reject)
    })

  }

  let signout = (callback) => {
    if(isAuthenticated){
      setUser(null)
      localStorage.removeItem('user')
      callback()
    }
  }

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


let SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [season, setSeason] = useState(0)

  const PRINTEMPS = 80
  const ETE = 172
  const AUTOMNE = 264
  const HIVER = 359
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