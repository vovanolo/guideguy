import React from 'react';
import axios from 'axios';

export default class Visit extends React.Component {
  state = {
    response: '',
  };

  componentDidMount() {
    const visitToken = this.props.match.params.visitToken;
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/visit/${visitToken}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.JWT_TOKEN}`,
        },
      })
      .then((res) => {
        this.setState({ response: res.data.message });
      })
      .catch((error) => {
        this.setState({
          response: JSON.stringify(error.response.data.message),
        });
        console.dir(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        {this.state.response}
      </div>
    );
  }
}
