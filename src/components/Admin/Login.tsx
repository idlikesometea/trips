import React from 'react';
import GoogleAuth from './GoogleAuth';

class Login extends React.Component {
    render() {
        return (
            <div className="ui placeholder segment">
                <div className="ui two column stackable center aligned grid">
                    <div className="ui vertical divider">Or</div>
                    <div className="middle aligned row">
                        <div className="column">
                            <div className="ui icon header">
                                <i className="world icon"></i>
                                Create your scratch map
                            </div>
                            <div className="field">
                                <div className="ui search">
                                    <div className="ui icon input">
                                        <input className="prompt" type="text" placeholder="Search countries..." />
                                        <i className="search icon"></i>
                                    </div>
                                    <div className="results"></div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui icon header">
                                <i className="plane icon"></i>
                                Log in and add your trips
                            </div>
                            <GoogleAuth />
                            <small>To display your pictures and locations you will need your files stored in a public Google Drive folder</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;