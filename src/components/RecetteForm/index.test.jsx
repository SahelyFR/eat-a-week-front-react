import { render, screen } from "@testing-library/react"
import { Form } from "react-final-form"

import RecetteForm from "."

describe('Recette form', () => {
  
  it('should render without crash an empty form', () => {
    const save = (formData) => {
      console.log(formData)
    }

    render(
      <Form 
        onSubmit={save}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-fluid">
            <RecetteForm recette={ RecetteForm.defaultProps } />
          </form>
        )}
      />
    )

    const rName = screen.getByRole('textbox', {name: 'Name*'})
    const rSpring = screen.getByTestId('checkbox-spring')
    expect(rName.value).toBe('')
    expect(rSpring.checked).toEqual(true)
  })

  it('should display existing recette values in form', () => {
    const save = (formData) => {
      console.log(formData)
    }

    const recette = {
      id: 5,
      name: 'Recette de test',
      weblink: 'https://google.fr',
      image: '',
      spring: false,
      summer: true,
      autumn: true,
      winter: true
    }
    
    render(
      <Form 
        onSubmit={save}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-fluid">
            <RecetteForm recette={ recette } />
          </form>
        )}
      />
    )

    const rName = screen.getByRole('textbox', {name: 'Name*'})
    const rSpring = screen.getByTestId('checkbox-spring')
    expect(rName.value).toBe(recette.name)
    expect(rSpring.checked).toEqual(false)
    
  })
})