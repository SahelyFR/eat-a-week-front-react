import { Component } from 'react'

import { Card } from 'primereact/card'

import RecetteListItem from "../RecetteListItem"
import RecetteGridItem from '../RecetteGridItem'

import './style.css'

class RecettePreview extends Component {
  constructor(props){
    super(props)
    this.state = {
      recette: props.recette,
      isPreview: props.preview
    }
  }
  render() {
    const rec = this.state.recette
    return this.state.isPreview ? (
      <span>
        <Card className='cardPreview'>
          <RecetteListItem recette={rec} />
          <RecetteGridItem recette={rec} />
        </Card>
      </span>
    ) : null
  }
}
 
export default RecettePreview