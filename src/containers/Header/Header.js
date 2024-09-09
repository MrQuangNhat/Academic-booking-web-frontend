import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, studentMenu, teacherMenu } from './menuApp';
import './Header.scss';
import { USER_ROLE } from '../../utils';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if (role === USER_ROLE.TEACHER) {
                menu = teacherMenu;
            }
            // if (role === USER_ROLE.TEACHER) {
            //     menu = teacherMenu;
            // }
            console.log('this is menu', menu)
        }

        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className='wellcome'>
                        <h5>
                            Welcome
                            {/* {userInfo && userInfo.roleId ? userInfo.roleId : ''} */}
                            : {userInfo && userInfo.fullName ? userInfo.fullName : ''} !
                        </h5>
                    </span>
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
