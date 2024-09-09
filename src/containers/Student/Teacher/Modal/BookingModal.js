import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileTeacher from '../ProfileTeacher';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postStudentBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            teacherId: '',
            studentCode: '',
            timeType: '',
            date: '',
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let teacherId = this.props.dataTime.teacherId;
                let timeType = this.props.dataTime.timeType;
                let date = this.props.dataTime.date;
                this.setState({
                    teacherId: teacherId,
                    timeType: timeType,
                    date: date,
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }


    handleConfirmBooking = async () => {
        let res = await postStudentBookAppointment({
            fullName: this.state.fullName,
            email: this.state.email,
            teacherId: this.state.teacherId,
            studentCode: this.state.studentCode,
            date: this.state.date,
            timeType: this.state.timeType,

        })

        if (res && res.errCode === 0) {
            toast.success('Booking complete')
            this.props.closeBookingClose();
        } else {
            toast.error('Booking error')
        }
    }

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let teacherId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            teacherId = dataTime.teacherId
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Schedule information</span>
                        <span
                            className='right'
                            onClick={closeBookingClose}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='teacher-infor'>
                            <ProfileTeacher
                                teacherId={teacherId}
                                isShowDescriptionTeacher={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Full Name</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Student code</label>
                                <input className='form-control'
                                    value={this.state.studentCode}
                                    onChange={(event) => this.handleOnChangeInput(event, 'studentCode')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        > Confirm</button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingClose}
                        > Cancel</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
