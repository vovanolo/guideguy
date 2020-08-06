import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div >
    )
  }
} 