import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { TextField, FormGroup, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Container } from '@material-ui/core';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHost: 'http://localhost:3050',
      id: '',
      name: '',
      address: '',
      description: '',
      lat: '',
      lng: '',
      imageUrl: '',
      places: []
    }

  }

  AddPlace(e) {
    e.preventDefault();
    const latlng = this.state.lat + ',' + this.state.lng;
    axios.post(`${this.state.serverHost}/places`, {
      name: this.state.name,
      address: this.state.address,
      latlng: latlng,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    }).then(res => this.setState({ places: [...this.state.places, res.data] }));
  }

  ViewPlaces() {
    axios.get(`${this.state.serverHost}/places`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    }).then(res => this.setState({places: res.data}))
  }

  DeletePlace() {
    axios.delete(`${this.state.serverHost}/places/${this.state.id}`);
  }

  SeedPlaces() {
    axios.post(`${this.state.serverHost}/admin/seed/places`, { count: 5 });
  }

  componentDidMount() {
    this.ViewPlaces();
  }

  render() {
    return (
      <Container>
        <br />
        <Typography variant="h3">Admin</Typography>
        <form onSubmit={e => this.AddPlace(e)}>
          <div className="input-row">
            <TextField
              type="text"
              variant="outlined"
              placeholder="Name"
              onChange={e => this.setState({ name: e.currentTarget.value })}
            />
            <TextField
              type="text"
              variant="outlined"
              placeholder="Address"
              onChange={e => this.setState({ address: e.currentTarget.value })}
            />
          </div>
          <div className="input-row">
            <TextField
              type="text"
              variant="outlined"
              placeholder="Latitude"
              onChange={e => this.setState({ lat: e.currentTarget.value })}
            />
            <TextField
              type="text"
              variant="outlined"
              placeholder="Longitude"
              onChange={e => this.setState({ lng: e.currentTarget.value })}
            />
          </div>
          <TextField
            fullWidth
            margin="normal"
            multiline
            type="text"
            variant="outlined"
            placeholder="Description"
            onChange={e => this.setState({ description: e.currentTarget.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            placeholder="Image URL"
            onChange={e => this.setState({ imageUrl: e.currentTarget.value })}
          />
          <Button variant="contained" color="primary" type="submit">Add Place</Button>
        </form>

        <br />
        <Button type="button" variant="contained" color="secondary" onClick={this.SeedPlaces}>Seed places</Button>
        <br />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">LatLng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.places.reverse().map((place) => (
                <TableRow key={place.id}>
                  <TableCell component="th" scope="row">
                    {place.id}
                  </TableCell>
                  <TableCell align="right">{place.name}</TableCell>
                  <TableCell align="right">{place.address}</TableCell>
                  <TableCell align="right">{place.lat + ',' + place.lng}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}