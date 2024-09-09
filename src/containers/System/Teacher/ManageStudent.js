import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageStudent.scss';
import DatePicker from '../../../components/Input/DatePicker';

class ManageStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        return (
            <div className='manage-student-container'>
                <div className='m-p-title'>
                    Quản lý lịch gặp sinh viên
                </div>
                <div className='manage-student-body row'>
                    <div className='col-4 form-group'>
                        <label> Chọn ngày </label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-student'>
                        <table style={{ width: '100%' }}>
                            <tr>
                                <th>Name</th>
                                <th colSpan="2">Email</th>
                            </tr>
                            <tr>
                                <td>Nam</td>
                                <td>nam@gmail.com</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);
