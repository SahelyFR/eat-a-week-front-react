import axios from "axios"
import { BASEURL } from "../utils/constants"


export function getRecettes(filter, callback) {
  let bearerToken = JSON.parse(localStorage.getItem('user')).token
  let url = filter !== '' ? `${BASEURL}/recettes/${filter}` : `${BASEURL}/recettes`
  axios.get(url, {
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': bearerToken
      }
    }).then(res => {
      callback(res)
    }, (reject) => {
      callback(reject)
    })
}