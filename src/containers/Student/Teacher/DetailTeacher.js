import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailTeacher.scss';
import { getDetailInforTeacher } from '../../../services/userService';
import users from '../../../assets/specialty/users.jpg';
import TeacherSchedule from './TeacherSchedule';


class DetailTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailTeacher: {},
            currentTeacherId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentTeacherId: id
            })
            let res = await getDetailInforTeacher(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailTeacher: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        let { detailTeacher } = this.state;
        let name = '';
        if (detailTeacher) {
            name = `${detailTeacher.fullName}`;
        }

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='teacher-detail-container'>
                    <div className='intro-teacher'>
                        <div className='content-left'>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                Teacher: {name}
                            </div>
                            <div className='down'>
                                {detailTeacher && detailTeacher.Markdown
                                    && detailTeacher.Markdown.description
                                    &&
                                    <span>
                                        {detailTeacher.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-teacher'>
                        <div className='content-left'>
                            <TeacherSchedule
                                teacherIdFromParent={this.state.currentTeacherId}
                            />
                        </div>
                        <div className='content-right'></div>
                    </div>
                    <div className='detail-infor-teacher'>
                        {detailTeacher && detailTeacher.Markdown && detailTeacher.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailTeacher.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-teacher'>

                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);
