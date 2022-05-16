import axios from "axios"

const BASEURL = 'http://localhost:8080/recettes'

export function getRecettes(filter, callback) {
  let bearerToken = JSON.parse(localStorage.getItem('user')).token
  let url = filter !== '' ? `${BASEURL}/${filter}` : BASEURL
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