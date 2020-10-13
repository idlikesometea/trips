import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };
    auth;

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.auth.signOut}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
        return (
            <button className="ui blue google button" onClick={this.auth.signIn}>
                <i className="google icon"></i>
                Sign In
            </button>
        )
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }

}

export default GoogleAuth;