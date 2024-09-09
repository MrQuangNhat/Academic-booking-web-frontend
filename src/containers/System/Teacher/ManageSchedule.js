import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from "react-select";
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, dateFormat } from '../../../utils';
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleTeacher } from '../../../services/userService';
import { USER_ROLE } from '../../../utils';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listTeachers: [],
            selectedTeacher: [],
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllTeachers();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // let { userInfo } = this.props;
        // if (prevProps.allTeachers !== this.props.allTeachers) {
        //     let role = userInfo.roleId;
        //     let dataSelect = this.buildDataInputSelect(this.props.allTeachers);
        //     if (role === USER_ROLE.ADMIN) {
        //         this.setState({
        //             listTeachers: dataSelect
        //         })
        //     }
        //     if (role === USER_ROLE.TEACHER) {
        //         this.setState({
        //             listTeachers: dataSelect
        //         })
        //     }
        // }
        if (prevProps.allTeachers !== this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers);
            this.setState({
                listTeachers: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.lenght > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }



    buildDataInputSelect = (inputData) => {
        let { userInfo } = this.props;
        let role = userInfo.roleId;
        let result = [];
        if (inputData && inputData.length > 0) {
            if (role === USER_ROLE.ADMIN) {
                inputData.map((item, index) => {
                    let object = {};
                    let label = `${item.fullName}`;
                    object.label = label;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (role === USER_ROLE.TEACHER) {
                let object = {};
                let label = userInfo.fullName;
                object.label = label;
                object.value = userInfo.id;
                result.push(object)
                console.log(userInfo)
            }
        }
        // let result = [];
        // if (inputData && inputData.length > 0) {
        //     inputData.map((item, index) => {
        //         let object = {};
        //         let label = `${item.fullName}`;
        //         object.label = label;
        //         object.value = item.id;
        //         result.push(object)
        //     })
        // }

        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedTeacher: selectedOption,
        });
        console.log(selectedOption)
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedTeacher, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error("Invalid date! ");
            return;
        }
        if (selectedTeacher && _.isEmpty(selectedTeacher)) {
            toast.error("Invalid selected teacher! ");
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();


        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.teacherId = selectedTeacher.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);

                })
            } else {
                toast.error("Invalid selected time! ");
                return;
            }
        }

        let res = await saveBulkScheduleTeacher({
            arrSchedule: result,
            teacherId: selectedTeacher.value,
            formatedDate: formatedDate
        })

        if (res && res.errCode === 0) {
            toast.success("Save infor succeed!");
        } else {
            toast.error("error saveBulkScheduleTeacher ");
            console.log('error saveBulkScheduleTeacher >>> res: ', res)
        }

    }

    render() {
        let { rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container" >
                <div className="m-s-title">
                    Manage schedule
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label> Teacher</label>
                            <Select
                                value={this.state.selectedTeacher}
                                onChange={this.handleChangeSelect}
                                options={this.state.listTeachers}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label> Choose date</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {item.value}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allTeachers: state.admin.allTeachers,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTeachers: () => dispatch(actions.fetchAllTeachers()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);