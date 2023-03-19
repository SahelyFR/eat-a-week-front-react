import { Component } from "react"
import PropTypes from 'prop-types'
import { Field } from "react-final-form"

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { classNames } from "primereact/utils"
import { InputText } from 'primereact/inputtext'

import { SEASONS } from '../../utils/constants'

class RecetteForm extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      recette: props.recette !== undefined ? props.recette : this.defaultProps,
      preview: false
    }
  }

  updateRecette(value) {
    this.setState({
      recette: value,
      preview: true
    })
  }

  onChange(event) { 
    const elmt = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    
    this.updateRecette({
      ...this.state.recette,
      [elmt]: value
    })
  }

  render() {
    const { recette, filter } = this.props
    const title = filter === 'add' ? 'Ajouter une recette' : 'Modifier une recette'
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error)
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    }

    return (
    <Card title={title}>
      <Field name="name" render={({ inputName, meta }) =>(
        <div className="field col-12">
          <span className='p-float-label p-input-icon-right'>
            <i className='pi pi-info-circle' />
            <InputText id="name" name="name" {...inputName}
              className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
              value={recette?.name}
              onChange={(e) => this.onChange(e)}
            />
            <label htmlFor="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}>Name*</label>
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
      
      <Field name="weblink" render={({ input, meta }) =>(
        <div className="field col-12">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-link" />
            <InputText id="weblink" name="weblink" {...input} 
              className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
              onChange={(e) => this.onChange(e)}
              value={recette?.weblink}
            />
            <label htmlFor="weblink" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}>Link*</label>
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />

      <Field name="image" render={({ input, meta }) =>(
        <div className="field col-12">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-image" />
            <InputText id="image" name="image" {...input} 
              className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
              onChange={(e) => this.onChange(e)}
              value={recette?.image}
            />
            <label htmlFor="image" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}>Image</label>
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
      
      <div className='formgroup-inline col-12'>
      {
        SEASONS.map((saison) => {
        return (
          <Field name={saison.name} type="checkbox" 
            key={`field-${recette.id}-${saison.name}`}
            render={({ input }) => (
            <div className="field-checkbox" key={`div-${recette.id}-${saison.name}`}>
              <input name={saison.name} type="checkbox" {...input}
                key={`checkbox-${recette.id}-${saison.name}`}
                data-testid={`checkbox-${saison.name}`}
                onChange={(e) => this.onChange(e)}
                checked={recette[saison.name]}
              />
              <label className="lbl-checkbox" htmlFor={saison.name}>{saison.name}</label>
            </div>
          )}
        />)
        })
      }
      </div>

      <div className="field col-3">
        <Button type="submit" label="Enregistrer" icon="pi pi-save" className="mt-2" />
      </div>
    </Card>
    )
  }
}

RecetteForm.propTypes = {
  name: PropTypes.string.isRequired,
  weblink: PropTypes.string.isRequired,
  image: PropTypes.string,
  spring: PropTypes.bool,
  summer: PropTypes.bool,
  autumn: PropTypes.bool,
  winter: PropTypes.bool
}

RecetteForm.defaultProps = {
  name: '',
  weblink: '',
  image: '',
  spring: true,
  summer: true,
  autumn: true,
  winter: true
}

export default RecetteForm