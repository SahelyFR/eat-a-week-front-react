import { Component } from "react"

import { Button } from 'primereact/button'
import { Rating } from "@mui/material"

import { SeasonIcons } from "../SeasonIcons"

class RecetteGridItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recette: props.recette
    }
  }

  render() {
    const rec = this.state.recette

    return (
      <div className="product-grid-item card">
        <div className="product-grid-item-top"><SeasonIcons recipe={rec} /></div>
        <div className="product-grid-item-content">
          <img src={rec.image} alt={rec.name}
            onError={(e) => e.target.src='/recipe_default.png'} 
          />
          <div className="product-name">{rec.name}</div>
          <Rating value={rec.rating} readOnly ></Rating>
        </div>
        <div className="product-grid-item-bottom">
          <Button icon="pi pi-external-link"
            label="Visit"
            disabled={rec.link === ''}>
          </Button>
        </div>
      </div>
    )
  }
}

export default RecetteGridItem