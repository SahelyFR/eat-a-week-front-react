import { useRef, useState } from "react"
import { useNavigate, useLocation} from "react-router-dom"
import { useAuth } from "../../utils/context"

import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Button} from 'primereact/button'
import { Messages } from 'primereact/messages'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const message = useRef(null)

  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [isDisabled, changeDisabled] = useState(true)
  const { checked, setChecked } = useState()

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault()

    auth.signin(username, password, (result) => {
      if (result?.status !== 200) {
        if (result?.response?.status === 403) {
          message.current.show({
            severity: 'error',
            summary: 'Error',
            content: 'Provided credentials are not correct ! Please try again',
            sticky: false,
            life: 5000
          });
        } else {
          message.current.show({
            severity: 'error',
            summary: 'Error',
            content: 'Something went bad while joining the server ! Please try again',
            sticky: false,
            life: 5000
          });
        }
      } else {
        navigate(from, { replace: true })
      }
    });
  }

  function toggleDisabled() {
    if (username !== '' && password !== '') {
      changeDisabled(false);
    } else {
      changeDisabled(true);
    }
  }

  function handleChange(event) {
    switch (event.target.name) {
      case 'username':
        changeUsername(event.target.value);
        toggleDisabled();
        break;
      case 'password':
        changePassword(event.target.value);
        toggleDisabled();
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex align-items-center justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <Messages ref={message}></Messages>
        <div className="text-center mb-5">
          <img src="assets/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">Don't have an account?</span>
          <a href="/register" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
        <InputText
          id="username"
          name="username"
          type="text"
          className="w-full mb-3"
          onChange={handleChange}
        />

        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        <InputText
          id="password"
          name="password"
          type="password"
          className="w-full mb-3"
          onChange={handleChange}
        />

        <div className="flex align-items-center justify-content-between mb-6">
          <div className="flex align-items-center">
            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
            <label htmlFor="rememberme">Remember me</label>
          </div>
          <a href="/reset-password" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
        </div>

        <Button label="Sign In" icon="pi pi-user" className="w-full" disabled={isDisabled}/>
      </form>
    </div>
  </div>
  );
}