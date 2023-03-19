import { useState, useRef, useEffect } from 'react'
import { Form } from "react-final-form"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { Container } from '@mui/material'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'

import './style.css'
import { BASEURL } from '../../utils/constants'
import { useFetch, useToken } from '../../utils/hooks'
import RecetteForm from '../../components/RecetteForm'
import RecettePreview from '../../components/RecettePreview'


export function RecettePage() {
  const { filter } = useParams()
  const param = filter === 'add' ? '0' : filter.valueOf()
  const { data, isLoading, error } = useFetch(`${BASEURL}/recette/${param}`)
  const toast = useRef(null)
  const bearer = useToken()
  const navigation = useNavigate()

  const [preview, setPreview] = useState(false)
  const [recette, setRecette] = useState(RecetteForm.defaultProps)

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
        errors.name = 'Name is required.';
    }

    if (!/^(https:\/\/)[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(data.link)) {
        errors.link = 'Invalid link. E.g. monsite.com';
    }

    if (!data.image) {
        errors.image = 'Image must have an image extension (png, jpg, gif ...).';
    }

    return errors;
  };

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

  useEffect(() => {
    
    if(!isLoading && !error && data.data !== undefined){
      setPreview(true)
      setRecette(data.data)
    }
  }, [data.data, isLoading, error])

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
        <Form 
          onSubmit={save}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">
              <RecetteForm recette={recette} />
            </form>
          )} />
        <RecettePreview recette={recette} preview={preview} />
      </div>
    )}
    </Container>
  )
}

export default RecettePage
