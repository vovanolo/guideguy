import React from "react";
import axios from "axios";

export default class Visit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
    };
  }

  componentDidMount() {
    const visitToken = this.props.match.params.visitToken;
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/visit/${visitToken}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU5NjI4MTQxNn0.qMuzjug-355aOKyQPQB77eOYYdiZniRB3KCrKVzIUrk",
        },
      })
      .then((res) => {
        this.setState({ response: res.data.message });
      })
      .catch((error) => {
        this.setState({ response: JSON.stringify(error) });
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
