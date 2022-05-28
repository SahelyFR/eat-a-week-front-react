import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { ProgressSpinner } from 'primereact/progressspinner'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Button } from "primereact/button"
import {Alert, AlertTitle, Rating } from "@mui/material"

import './style.css'
import { BASEURL } from "../../utils/constants"
import { SeasonIcons } from "../../components/SeasonIcons"
import { useFetch } from "../../utils/hooks"

export function RecettesPage() {
  const { filter } = useParams()
  const msgs1 = useRef()
  const param = filter === 'all' ? '' : filter
  const { data, isLoading, error } = useFetch(`${BASEURL}/recettes/${param}`)
  const recettes = data?.data

  const [layout, setLayout] = useState('grid')

  useEffect(() => {
    msgs1.current ={
      severity: 'error',
      summary: `There was an error !`,
      detail: 'Something went bad while joining the server ! Please try again'
    }
    
  }, [error, recettes])
   
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

  const renderListItem = (recette) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img 
            src={recette.image}
            onError={(e) => 
              e.target.src='recipe_default.png'} 
            alt={recette.name} />
          <div className="product-list-detail">
            <div className="product-name">{recette.name}</div>
            <Rating value={recette.rating} readOnly ></Rating>
          </div>
          <div className="product-list-action">
            
            <Button
              icon="pi pi-external-link"
              label="Visit"
              disabled={recette.link === ''}>
            </Button>
            <SeasonIcons recipe={recette} />
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (rec) => {    
    return (
      <div className="col-12 md:col-3">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <SeasonIcons recipe={rec} />
          </div>
          <div className="product-grid-item-content">
          <img 
            src={rec.image} 
            onError={(e) => 
              e.target.src='/recipe_default.png'} 
            alt={rec.name} />
            <div className="product-name">{rec.name}</div>
            <Rating value={rec.rating} readOnly ></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <Button
              icon="pi pi-external-link"
              label="Visit"
              disabled={rec.link === ''}>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const itemTemplate = (product, dataPrez) => {
    if (!product) {
        return;
    }

    if (dataPrez === 'list')
        return renderListItem(product);
    else if (dataPrez === 'grid')
        return renderGridItem(product);
  }

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{textAlign: 'left'}}>
          <DataViewLayoutOptions 
            layout={layout} 
            onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  }

  const header = renderHeader();

  return (
    <div className="dataview-demo">
      { isLoading ? (<ProgressSpinner />) : (
        <div className="card">
          <DataView
            value={recettes}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
            paginator
            rows={12} />
        </div>
      )
    }
  </div>
    
  );
}
