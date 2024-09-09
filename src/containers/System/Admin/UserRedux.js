import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],

            email: '',
            password: '',
            fullName: '',
            studentCode: '',
            role: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getRoleStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didupdate
        // current (this) and past (previous)
        // [] [3]
        // [3] [3]
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                fullName: '',
                studentCode: '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                studentCode: this.state.studentCode,
                roleId: this.state.role,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                studentCode: this.state.studentCode,
                roleId: this.state.role,
            })

        }

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'fullName']

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }

        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        this.setState({
            email: user.email,
            password: 'HARDCORE',
            fullName: user.fullName,
            studentCode: user.studentCode,
            role: user.roleId,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }


    render() {
        let roles = this.state.roleArr;
        let { email, password, fullName, studentCode, role } = this.state
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    User redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className="row g-3" >
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Full name</label>
                                    <input type="text" className="form-control"
                                        value={fullName}
                                        onChange={(event) => { this.onChangeInput(event, 'fullName') }} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Student code</label>
                                    <input type="text" className="form-control"
                                        value={studentCode}
                                        onChange={(event) => { this.onChangeInput(event, 'studentCode') }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Role</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        value={role}
                                    >
                                        {roles && roles.length > 0
                                            && roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {item.value}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button
                                        className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => this.handleSaveUser()}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ?
                                            "edit"
                                            :
                                            "save"
                                        }
                                    </button>
                                </div>

                                <div className='col-12 mb-5'>
                                    <TableManageUser
                                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        roleRedux: state.admin.roles,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),


        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
