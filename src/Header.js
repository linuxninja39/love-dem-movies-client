import * as React from "react";
import {connect} from "react-redux";
import {receiveMovies} from "./store/actions";
import UserHeader from "./LoginForm";

const stateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

const dispatchToProps = dispatch => {
    return {}
}

class StatelessHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="App-header">
                Love Dem Movies
                <div>
                    <UserHeader />
                </div>
            </header>
        );
    }
}

const Header = connect(stateToProps, dispatchToProps)(StatelessHeader);

export default Header;
