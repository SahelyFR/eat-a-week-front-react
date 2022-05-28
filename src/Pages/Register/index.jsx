
import React, { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { classNames } from 'primereact/utils'
import axios from 'axios'
import { BASEURL } from '../../utils/constants'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [formData, setFormData] = useState({})
  const defaultValues = {
      username: '',
      email: '',
      password: '',
      enabled: true
  }

  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues })
  const navigation = useNavigate()
  const toast = useRef(null)

  const register = (formulaire) => {
    formulaire.password = btoa(formulaire.password)
    setFormData(formulaire)
    
    axios.post(`${BASEURL}/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
    .then(res => {
      console.log(`New user : ${res}`)
      if (res.status === 200) {
        toast.current.show({
          topOffset: 60,
          type: 'success',
          text1: 'Registration Succeeded',
          text2: 'Please Login into your account',
        })
        setShowMessage(true)
        setTimeout(() => {
          navigation('/login')
        }, 1500);
      }
    })
    .catch(error => {
      toast.current.show({
        topOffset: 60,
        type: error,
        text1: 'Something went wrong',
        text2: 'Please try again',
      })
    })
    
    reset()
  }

  const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  }

  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
  const passwordHeader = <h6>Pick a password</h6>
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  )

  return (
    <div className="flex align-items-center justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
          <div className="flex justify-content-center flex-column pt-6 px-3">
            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h5>Registration Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
              Your account is registered under name <b>{formData.username}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
            </p>
          </div>
        </Dialog>
        <Toast ref={toast} />
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">Register</h5>
            <form onSubmit={handleSubmit(register)} className="p-fluid">
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Username is required.', maxLength: 50 }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="username" className={classNames({ 'p-error': errors.name })}>Username*</label>
                </span>
                {getFormErrorMessage('username')}
              </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required.',
                      maxLength: 50,
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address. E.g. example@email.com' }}}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field} 
                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                </span>
                {getFormErrorMessage('email')}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller name="password"
                    control={control}
                    rules={{ required: 'Password is required.' }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        toggleMask
                        className={classNames({ 'p-invalid': fieldState.invalid })}
                        header={passwordHeader}
                        footer={passwordFooter} />
                  )} />
                  <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                </span>
                {getFormErrorMessage('password')}
              </div>
              <Button type="submit" label="Submit" className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
             