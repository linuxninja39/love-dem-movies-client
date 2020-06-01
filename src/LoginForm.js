import * as React from "react";
import {connect} from "react-redux";
import {login} from "./store/actions";

const stateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

const dispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            console.log('login form login', username, password);
            dispatch(login(username, password));
        }
    }
}

class StatelessUserHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {username: null, password: null};
    }

    handleLogin = () => {
        console.log('handle loggin state', this.state);
        if (this?.state?.username && this?.state?.password) {
            this.props.login(this.state.username, this.state.password);
            return;
        }

        this.props.login('user2', 'hunter2');
    }

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        const {loggedIn} = this.props;
        return (
            <dev>
                {
                    loggedIn ?
                        (<dev>Hi bob</dev>) :
                        (
                            <dev>
                                <input value={this.state.username} placeholder={'username'} onChange={this.handleUsernameChange} />
                                <input value={this.state.password} placeholder={'password'} onChange={this.handlePasswordChange} />
                                <button onClick={this.handleLogin}>Submit</button>
                            </dev>
                        )
                }
            </dev>
        );
    }
}

const UserHeader = connect(stateToProps, dispatchToProps)(StatelessUserHeader);

export default UserHeader;
