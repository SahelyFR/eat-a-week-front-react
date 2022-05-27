import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

function RecettePreview(props) {
  const recetteHeader = props.recette.image !== undefined ? 
    <img src={props.recette.image} alt="Recette" className='recette-image' /> : null

  const recetteContent = props.recette.link !== undefined ?
    <Button label="Voir la recette" /> : null

  return (
    <div className='preview'>
      { props.isPreview ? (
      <Card className="cardPreview" title={`Preview ${props.recette.name}`} header={recetteHeader}>
        {recetteContent}
      </Card>) : null
      }
    </div>)
}

export default RecettePreview