import { Component } from 'react';
import { withOptice } from 'optux';
import { auth } from 'commands/auth';

class AuthProvider extends Component {

    componentDidMount() {
        this.props.auth();
    }

    render() {
        return this.props.children;
    }
}

const enhance = withOptice(
    null,
    { auth }
);

export default enhance(AuthProvider);