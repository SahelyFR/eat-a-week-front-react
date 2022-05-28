import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import PropTypes from 'prop-types'

import { Container } from '@mui/material'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'

import './style.css'
import { BASEURL, SEASONS } from '../../utils/constants'
import { useFetch, useToken } from '../../utils/hooks'
import RecettePreview from '../RecettePreview'


function Recette() {
  const { filter } = useParams()
  const param = filter === 'add' ? '0' : filter.valueOf()
  const { register,  errors , handleSubmit, reset } = useForm()
  const { data, isLoading, error } = useFetch(`${BASEURL}/recette/${param}`)
  const toast = useRef(null)
  const bearer = useToken()
  const navigation = useNavigate()

  const [preview, setPreview] = useState(false)
  const [recette, setRecette] = useState(Recette.defaultProps)

  const title = filter === 'add' ? 'Ajouter une recette' : 'Modifier une recette'

  useEffect(() => {
    
    if(!isLoading && !error && data?.data !== "" ){
      setPreview(true)
      setRecette(data.data)
    }
  }, [data.data, isLoading, error])

  useEffect(() => {
    
    if(errors !== undefined){
      errors.forEach((e) => {
        toast.current.show({
          severity: 'error',
          summary: 'Something went wrong',
          detail: e,
        })
      })
    }
  }, [errors])

  const onChange = (event) => { 
    const elmt = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    
    setPreview(true)
    setRecette(recette => ({
      ...recette,
      [elmt]: value
    }))
    reset(recette)
  }

  const save = (formData) => {
    console.log(formData)
    const action = filter === 'add' ? 'post' : 'put'
    axios({
      method: action,
      url: `${BASEURL}/recette/${filter}`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': bearer
      },
      data: formData
    })
    .then(res => {
      console.log(res.data.id)
      if (res.status === 200) {
        toast.current.show({
          severity: 'success',
          summary: 'Recette modifiée',
          detail: 'Find here new recette just in some seconds',
        })
        setTimeout(() => {
          navigation(`/protected/recette/${res.data.id}`)
        }, 1500);
      }
    })
    .catch(err => {
      toast.current.show({
        severity: 'error',
        summary: 'Something went wrong',
        detail: err,
      })
    })
  }

  if(error) {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'There was an error communicating with the server',
      life: 8000
    })
  }

  return (
    <Container maxWidth="md">
      <Toast ref={toast} />
    { isLoading ? (<ProgressSpinner />) : (
      <div>
        <Card title={title}>
        <form onSubmit={handleSubmit(save)}>
          <div className='grid'>
            <div className="field col-6">
              <span className='p-float-label p-input-icon-right'>
                <i className='pi pi-info-circle' />
                <InputText {...register("name", {required: true, minLength: 5, maxLength: 50})}
                  value={recette?.name}
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="name">Name*</label>
              </span>
            </div>
            <div className='formgroup-inline col-6'>
            {
              SEASONS.map((saison) => {
              return (
                <div className="field-checkbox" key={`div-${recette.id}-${saison}`}>
                  <input type="checkbox" {...register(`${saison}`)}
                    key={`checkbox-${recette.id}-${saison}`}
                    onChange={(e) => onChange(e)}
                    checked={recette[saison]} />
                  <label className="lbl-checkbox" htmlFor={saison}>{saison}</label>
                </div>
                )
              })
            }
            </div>
          </div>
          
          <div className='grid'>
            <div className="field col-6">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-link" />
                <InputText {...register("link", {maxLength: 150})}
                  onChange={(e) => onChange(e)}
                  value={recette?.link}
                />
                <label htmlFor="link">Link*</label>
              </span>
            </div>
            <div className="field col-6">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-image" />
                <InputText {...register('image', {maxLength: 150})} 
                  onChange={(e) => onChange(e)}
                  value={recette?.image}
                />
                <label htmlFor="image">Image</label>
              </span>
            </div>
          </div>
          <Button type="submit" label="Enregistrer" icon="pi pi-save" className="mt-2" />
        </form>
      </Card>
      <RecettePreview recette={recette} isPreview={preview}/>
      </div>
    )}
    </Container>
  )
}

Recette.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string,
  spring: PropTypes.bool,
  summer: PropTypes.bool,
  autumn: PropTypes.bool,
  winter: PropTypes.bool
}

Recette.defaultProps = {
  name: '',
  link: '',
  image: '',
  spring: true,
  summer: true,
  autumn: true,
  winter: true
}

export default Recette