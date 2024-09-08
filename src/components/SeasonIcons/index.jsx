import { Icon } from "@mui/material"

import { SEASONS } from "../../utils/constants"

export function SeasonIcons({recipe}) {
  return (
    SEASONS.map((season) => (
      recipe[season.name] ? <Icon 
        style={{ backgroundColor: season.color, color: '#ffffff'}}
        key={`rec-${recipe.id}-${season.name}`}>
        {season.icon}
        </Icon> : null
      )))
}