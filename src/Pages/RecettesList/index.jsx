import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { ProgressSpinner } from 'primereact/progressspinner'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Dropdown } from 'primereact/dropdown'
import { Alert, AlertTitle } from "@mui/material"

import { BASEURL } from "../../utils/constants"
import { useFetch } from "../../utils/hooks"
import RecetteListItem from "../../components/RecetteListItem"
import RecetteGridItem from "../../components/RecetteGridItem"

import './style.css'

export function RecettesListPage() {
  const { filter } = useParams()
  const msgs1 = useRef()
  const param = filter === 'all' ? '' : filter
  const { data, isLoading, error } = useFetch(`${BASEURL}/recettes/${param}`)
  const recettes = data?.data

  const [layout, setLayout] = useState('grid')
  const [sortKey, setSortKey] = useState('name')
  const [sortOrder, setSortOrder] = useState(1)
  const [sortField, setSortField] = useState('name')
  const sortOptions = [
      {label: 'Name A -> Z', value: 'name'},
      {label: 'Name Z -> A', value: '!name'},
  ]
  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    }
    else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  }

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
      <div className="col-8 centered-list-item">
        <RecetteListItem recette={recette} />
      </div>
    );
  }

  const renderGridItem = (rec) => {    
    return (
      <div className="col-12 md:col-3">
        <RecetteGridItem recette={rec} />
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
        <div className="col-6" style={{textAlign: 'right'}}>
          <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Name" onChange={onSortChange}/>
        </div>
      </div>
    );
  }

  const header = renderHeader();

  return (
    <div className="recettesList">
      { isLoading ? (<ProgressSpinner />) : (
        <div className="card">
          <DataView
            value={recettes}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
            paginator
            sortOrder={sortOrder}
            sortField={sortField}
            rows={12} />
        </div>
      )
    }
  </div>
    
  );
}
