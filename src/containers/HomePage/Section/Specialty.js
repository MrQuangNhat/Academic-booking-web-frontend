import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { size } from 'lodash';
import { withRouter } from 'react-router';



class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTeachers: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topTeachersRedux !== this.props.topTeachersRedux) {
            this.setState({
                arrTeachers: this.props.topTeachersRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopTeachers();
    }

    handleViewDetailTeacher = (teacher) => {
        if (this.props.history) {
            this.props.history.push(`detail-teacher/${teacher.id}`)
        }
    }

    render() {
        let arrTeachers = this.state.arrTeachers;
        // arrTeachers = arrTeachers.concat(arrTeachers).concat(arrTeachers)

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Giáo viên</span>
                        <button className='btn-section'>thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrTeachers && arrTeachers.length > 0
                                && arrTeachers.map((item, index) => {
                                    let name = `${item.fullName}`;
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailTeacher(item)}>
                                            <div className='customize-border'>
                                                <div className='position '>
                                                    <div className='text'>{name}</div>
                                                    <div className='bg-image section-specialty' />
                                                    <div>Nhóm </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topTeachersRedux: state.admin.topTeachers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopTeachers: () => dispatch(actions.fetchTopTeacher())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
