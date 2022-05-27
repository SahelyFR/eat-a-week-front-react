import { render, screen } from "@testing-library/react"
import { HomePage } from "."

describe('HomePage', () => {
  test('Should render without crashing and render an image', async () => {
    render(<HomePage />)
    const image = screen.getByRole('img')
    expect(image.src).toBe('https://www.primefaces.org/primeblocks-react/assets/images/blocks/hero/hero-1.png')
  })
  
})