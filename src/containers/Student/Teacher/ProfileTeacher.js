import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileTeacher.scss';
import { getProfileTeacherById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforTeacher(this.props.teacherId);
        this.setState({
            dataProfile: data
        })
    }

    getInforTeacher = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileTeacherById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.teacherId !== prevProps.teacherId) {

        }
    }
    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.value;
            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                </>
            )
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { isShowDescriptionTeacher, dataTime } = this.props;
        let name = '';
        if (dataProfile) {
            name = `${dataProfile.fullName}`
        }
        return (
            <div className='profile-teacher-container'>
                <div className='intro-teacher'>
                    <div className='content-left'></div>
                    <div className='content-right'>
                        <div className='up'>
                            Teacher: {name}
                        </div>
                        <div className='down'>
                            {isShowDescriptionTeacher === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown
                                        && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTeacher);
