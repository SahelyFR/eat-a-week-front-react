import { Icon } from "@mui/material"

import { SEASON_CONFIG as seasons } from "../../utils/constants"

export function SeasonIcons({recipe}) {
  return (
    seasons.map((season) => (
      recipe[season.name] ? <Icon 
        style={{ backgroundColor: season.color, color: '#ffffff'}}
        key={`rec-${recipe.id}-${season.name}`}>
        {season.icon}
        </Icon> : null
      )))
}