import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Menu } from 'semantic-ui-react';

import GoogleAuth from './Admin/GoogleAuth';
import { User } from '../models/Auth.model';

interface Props {
    user: User;
};

class UserItem extends React.Component<Props> {
    render() {
        return (  
            <Dropdown direction="left" item text={this.props.user.givenName}>                
                <Dropdown.Menu className="menu-dropdown">
                    <Dropdown.Item>
                        <Link to="/">Dashboard</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <GoogleAuth />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        user: state.auth.user
    };
};

export default connect(mapPropsToState)(UserItem);