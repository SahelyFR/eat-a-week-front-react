import { Component } from "react"

import { SeasonIcons } from "../SeasonIcons"

import { Button } from 'primereact/button'
import { Rating } from "@mui/material"

class RecetteListItem extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      recette: props.recette
    }
  }

  render() {
    const rec = this.state.recette

    return (
      <div className="product-list-item">
        <img src={rec.image} alt={rec.name}
          onError={(e) => e.target.src='/recipe_default.png'} 
        />
        <div className="product-list-detail">
          <div className="product-name">{rec.name}</div>
          <div className="rating"><Rating value={rec.rating} readOnly ></Rating></div>
          <div className="seasonIcons"><SeasonIcons recipe={rec} /></div>
        </div>
        <div className="product-list-action">
          <Button icon="pi pi-external-link"
            label="Visit"
            disabled={rec.link === ''}>
          </Button>
        </div>
      </div>
    )
  }
}

export default RecetteListItem