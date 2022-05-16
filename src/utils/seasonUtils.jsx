import { SEASONS } from "./constants"

const PRINTEMPS = 80
const ETE = 172
const AUTOMNE = 264
const HIVER = 359

export default function getSeason(){
  let mySeason = 0
  let today = getToday()

  if(today >= PRINTEMPS && today < ETE){
    mySeason = 1;
  }else if(today >= ETE && today < AUTOMNE){
    mySeason = 2;
  } else if(today >= AUTOMNE && today < HIVER){
    mySeason = 3;
  } else if(today >= HIVER || today < PRINTEMPS){
    mySeason = 4;
  }
  return SEASONS[mySeason-1];
}

function getToday(){
  var now = new Date()
  var start = new Date(now.getFullYear(), 0, 0)
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
  var oneDay = 1000 * 60 * 60 * 24
  var day = Math.floor(diff / oneDay)
  return day
}