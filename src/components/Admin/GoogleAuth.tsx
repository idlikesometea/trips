import React from 'react';

import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

interface Props {
    userLogged: boolean;
    userId: number;
    signIn: (userId:number) => void;
    signOut: () => void;
}

class GoogleAuth extends React.Component<Props> {
    auth;

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isLoggedIn) => {
        if (isLoggedIn) 
            this.props.signIn(this.auth.currentUser.get().getId());
        else 
            this.props.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.userLogged === null) {
            return null;
        } else if (this.props.userLogged) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
        return (
            <button className="ui blue google button" onClick={this.onSignInClick}>
                <i className="google icon"></i>
                Sign In
            </button>
        )
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }

}

const mapStateToProps = (state) => {
    return {
        userLogged: state.auth.userLogged,
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps, {
    signIn,
    signOut
})(GoogleAuth);