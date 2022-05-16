import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks"
import { ProgressSpinner } from 'primereact/progressspinner'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Button } from "primereact/button"

import {Alert, AlertTitle, Rating, Icon } from "@mui/material"
import { SEASON_CONFIG as seasons } from "../../utils/constants"

import './style.css'


const BASEURL = 'http://localhost:8080/recettes'

export function RecettesPage() {
  const { filter } = useParams()
  const msgs1 = useRef()
  const param = filter === 'all' ? '' : filter
  const { data, isLoading, error } = useFetch(`${BASEURL}/${param}`)
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

  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img src={`images/product/${data.image}`} onError={(e) => e.target.src='recipe_default.png'} alt={data.name} />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <Rating value={data.rating} readOnly ></Rating>
          </div>
          <div className="product-list-action">
            
            <Button icon="pi pi-external-link" label="Visit" disabled={data.link === ''}></Button>
            {seasons.map((season) => (
              data[season.name] ? <Icon 
                style={{ backgroundColor: season.color, color: '#ffffff'}}
                key={`rec-${data.id}-${season.name}`}>
                {season.icon}
                </Icon> : null
              ))}
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (data) => {    
    return (
      <div className="col-12 md:col-3">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            {seasons.map((season) => (
              data[season.name] ? <Icon 
                style={{ backgroundColor: season.color, color: '#ffffff'}}
                key={`rec-${data.id}-${season.name}`}>
                {season.icon}
                </Icon> : null
              ))}
          </div>
          <div className="product-grid-item-content">
          <img src={`images/product/${data.image}`} onError={(e) => e.target.src='/recipe_default.png'} alt={data.name} />
            <div className="product-name">{data.name}</div>
            <Rating value={data.rating} readOnly ></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <Button icon="pi pi-external-link" label="Visit" disabled={data.link === ''}></Button>
          </div>
        </div>
      </div>
    );
  }

  const itemTemplate = (product, layout) => {
    if (!product) {
        return;
    }

    if (layout === 'list')
        return renderListItem(product);
    else if (layout === 'grid')
        return renderGridItem(product);
  }

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{textAlign: 'left'}}>
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  }

  const header = renderHeader();

  return (
    <div className="dataview-demo">
      { isLoading ? (<ProgressSpinner />) : (
        <div className="card">
          <DataView value={recettes} layout={layout} header={header}
            itemTemplate={itemTemplate} paginator rows={9} />
        </div>
      )
    }
  </div>
    
  );
}
