import PropTypes from 'prop-types'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'


function handleClick(lien, event) {
  event.preventDefault();
  window.open(lien, '_blank')
}

function Recette({ id, name, seasons, link}) {
  
  const footer = <span>
    { link !== '' ? (
      <Button 
        label="Visit"
        icon="pi pi-external-link"
        onClick={(e) => handleClick(link, e)}
        style={{marginRight: '.25em'}}
      />
    ) : null }
  </span>

  return (
    <Card 
      key={`${name}-${id}`}
      title={name}
      footer={footer}
      style={{display: 'flex', flexDirection: 'column', height: '200px', width:'300px'}}>
      { seasons.map((saison) => (
        <span key={`span-${id}-${saison.name}`}>{saison.value ? `${saison.name} ` : null}</span> 
      ))}
    </Card>
  )
}

Recette.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  spring: PropTypes.bool,
  summer: PropTypes.bool,
  autumn: PropTypes.bool,
  winter: PropTypes.bool
}

Recette.defaultProps = {
  name: '',
  link: '',
  image: '',
  spring: true,
  summer: true,
  autumn: true,
  winter: true
}

export default Recette