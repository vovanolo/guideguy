import React from 'react';
import axios from 'axios';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHost: 'http://localhost:3050',
      id: '',
      name: '',
      adress: '',
      description: '',
      latlng: '',
      places: []
    }

  }

  AddPlace(e) {
    e.preventDefault();
    axios.post(`${this.state.serverHost}/admin/places`, {
      name: this.state.name,
      adress: this.state.adress,
      latlng: this.state.latlng,
      description: this.state.description,
    }).then(res => console.log(res.data));
  }

  ViewPlace() {
    axios.get(`${this.state.serverHost}/admin/places`).then(res => this.setState({places: res.data}))
  }

  // DeletePlace() {
  //   axios.delete(`${this.state.serverHost}/admin/places${this.state.id}`).
  // }

  componentDidMount(){
    this.ViewPlace();
  }

  render() {
    return (
      <div className="container ml-auto">
        <h1>Admin</h1>
        <form onSubmit={e => this.AddPlace(e)}>
          <input type="text" className="form-control" defaultValue="eee" placeholder="Name" onChange={e => this.setState({name: e.currentTarget.value})} />
          <input type="text" className="form-control" placeholder="Adress" onChange={e => this.setState({adress: e.currentTarget.value})} />
          <br />
          <input type="text" className="form-control" placeholder="Lat. Lng." onChange={e => this.setState({latlng: e.currentTarget.value})} />
          <textarea type="text" placeholder="Description" onChange={e => this.setState({description: e.currentTarget.value})} />
          <input type="file" placeholder="photo" />

          <input type="submit" className="btn btn-primary" value="Додати місце" />

         
         

        </form>
        
        <table class="table table-dark">
        <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">adress</th>
                    <th scope="col">latlang</th>
                  </tr>
                </thead>
            {this.state.places.map((place, index) => (
              // <li key={index}>{place.name}</li>
                <tbody>
                  <tr>
                    <th key={index} scope="row">{place.id}</th>
                    <td key={index}>{place.name}</td>
                    <td key={index}>{place.adress}</td>
                    <td key={index}>{place.latlng}</td>
                    <td><button className="btn btn-warning">Edit</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                  </tr>
                </tbody>
            ))}
        </table>


        <button onClick={() => axios.post(`${this.state.serverHost}/admin/seed/places`, {count:5})} className="btn btn-success">Go dani</button>


      </div>
    );
  }
}