import React from 'react';

import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import { User } from '../../models/Auth.model';
import Loader from '../ui/Loader';

interface Props {
    userLogged: boolean;
    user: User;
    signIn: (user:User) => void;
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
        if (isLoggedIn) {
            const user = {
                id: this.auth.currentUser.get().getId(),
                givenName: this.auth.currentUser.get().getBasicProfile().getGivenName(),
                familyName: this.auth.currentUser.get().getBasicProfile().getFamilyName(),
                imageUrl: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
                email: this.auth.currentUser.get().getBasicProfile().getEmail()
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.props.signIn(user);
        } else {
            localStorage.removeItem('userId');
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.userLogged === null) {
            return <Loader />;
        } else if (this.props.userLogged) {
            return (
                <button className="ui tiny red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
        return (
            <button className="ui tiny blue google button" onClick={this.onSignInClick}>
                <i className="google icon"></i>
                Log In with Google
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