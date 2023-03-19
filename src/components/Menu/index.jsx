import { Component } from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

class Menu extends Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      recettes: props.recettes,
    }
  }

  render() {
      
    return (
      <div>
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="Weekly menu">
            <TableHead>
              <TableRow>
                <TableCell>Jour 1</TableCell>
                <TableCell>Jour 2</TableCell>
                <TableCell>Jour 3</TableCell>
                <TableCell>Jour 4</TableCell>
                <TableCell>Jour 5</TableCell>
                <TableCell>Jour 6</TableCell>
                <TableCell>Jour 7</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              {this.state.recettes.map((row) => (
                <TableCell key={`recette-${row.id}`} component="th" scope="row">
                  {
                    row.weblink !== '' ? 
                      (<a href={row.weblink} target="_blank" rel="noreferrer">{row.name}</a>) :
                      row.name
                  }
                </TableCell>
              ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> 
      </div>
    )
  }
}

export default Menu
