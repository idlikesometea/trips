import React from 'react';

import { Link } from 'react-router-dom';
import './Landing.css';

export default () => {
    return (
        <div className="landing">
            <div className="ui inverted vertical masthead center aligned segment">
                <div className="ui container">
                    <div className="ui text container">
                        <h1 className="ui inverted header">Trips</h1>
                        <h3>Create your own scratch map</h3>
                        <Link to="/creator" className="ui medium primary button">
                            Go to creator 
                            <i className="right arrow icon"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="ui vertical stripe segment showcase">
                <div className="ui middle aligned stackable grid container">
                    <div className="row">
                        <div className="eight wide column">
                            <h3 className="ui header">Create and share your scratch map</h3>
                            <p>Select all the countries you've visited and create your map.</p>
                        </div>
                        <div className="six wide right floated column">
                            <Link to="m/example">
                                <img alt="Map with painted countries" src="/map_example.png" className="ui large bordered rounded image" />
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="six wide left floated column">
                            <Link to="m/example">
                                <img alt="Files displayed on map" src="/trips_example.png" className="ui large bordered rounded image" />
                            </Link>
                        </div>                    
                        <div className="eight wide column">
                            <h3 className="ui header">Add your photos and videos</h3>
                            <p> Sign up with Google and save your map for later updates, add trips, photos and more.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ui inverted vertical footer segment">
                <div className="ui container">
                    <div className="ui stackable inverted divided equal height stackable grid">
                        <div className="eight wide column">
                            <h4 className="ui inverted header">Contact</h4>
                            <div className="ui inverted link list">
                                <a href="https://idlikesometea.com" className="item">My site</a>
                                <a href="mailto:idlikesometea@gmail.com" className="item">Mail me</a>
                                <a href="https://www.linkedin.com/in/idlikesometea/?locale=en_US" className="item">Linkedin</a>
                            </div>
                        </div>
                        <div className="eight wide column">
                            <h4 className="ui inverted header">About</h4>
                            <div className="ui inverted link list">
                                <a href="https://github.com/idlikesometea/trips" className="item">The Code</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};