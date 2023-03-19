import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

import { ProgressSpinner } from 'primereact/progressspinner'
import { DataView } from 'primereact/dataview'
import { Alert, AlertTitle, Button } from "@mui/material"
import ReplayIcon from '@mui/icons-material/Replay'

import { BASEURL } from "../../utils/constants"
import { useFetch } from "../../utils/hooks"
import Menu from "../../components/Menu"
import RecetteListItem from "../../components/RecetteListItem"

export function MenuPage() {
  const { filter } = useParams()
  const msgs1 = useRef()
  const { data, isLoading, error } = useFetch(`${BASEURL}/menu/${filter}`)
  const recettes = data?.data
  
  useEffect(() => {
    msgs1.current ={
      severity: 'error',
      summary: `There was an error !`,
      detail: 'Something went bad while joining the server ! Please try again'
    }
    
  }, [error])
  
  const renderListItem = (recette) => {
    return (
      <div className="col-8 centered-list-item">
        <RecetteListItem recette={recette} />
      </div>
    );
  }
   
  if(error){
    return (
      <div>
        <Alert severity={msgs1.current.severity}>
          <AlertTitle>{msgs1.current.summary}</AlertTitle>
          {msgs1.current.detail}
        </Alert>
      </div>
    )
  }

  return (
    <div className="recettesMenu">
      <h2>Menu "{filter}" <Button variant="contained" color="primary"  onClick={() => window.location.reload(false)}  endIcon={<ReplayIcon />} label="Re-générer">Re-générer</Button></h2>
      {isLoading ? (<ProgressSpinner />) :
        (<div className="recettesList col-10 centered-list-item">
            <Menu recettes={recettes} />
          </div>
        )
     }
    </div>) 
  
  /*
  return (
    <div className="recettesMenu">
      <h2>Menu "{filter}" <Button variant="contained" color="primary"  onClick={() => window.location.reload(false)}  endIcon={<ReplayIcon />} label="Re-générer">Re-générer</Button></h2>
      {isLoading ? (<ProgressSpinner />) :
        (<div className="recettesList">
            <DataView
              value={recettes}
              layout='list'
              itemTemplate={renderListItem}
              rows={7} />
          </div>
        )
     }
    </div>) 
    */
}
