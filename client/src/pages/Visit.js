import React from 'react';
import axios from 'axios';

export default class Visit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: ''
        }
    }

    componentDidMount() {
        axios.get(`http://192.168.1.8:3060/visit/${this.props.match.params.visitToken}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU5NjI4MTQxNn0.qMuzjug-355aOKyQPQB77eOYYdiZniRB3KCrKVzIUrk'
            }
        })
            .then(res => {
                this.setState({ response: res.data.message });
            })
            .catch(error => {
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