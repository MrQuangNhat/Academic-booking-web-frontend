import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo3 from '../../assets/logo3.svg';
import { withRouter } from 'react-router';


class HomeHeader extends Component {

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        console.log('check props:', this.props)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content1'>
                            <i class="fas fa-bars"></i>

                        </div>
                        <div className='left-content2'>

                            <img className='header-logo' src={logo3} onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>
                            {/* <div className='child-content'>
                                <div><b>Học phần</b></div>
                                <div className='subs-title'>Tìm nhóm theo học phần</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Quản lý tài khoản</b></div>
                                <div className='subs-title'>Thông tin sinh viên</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Lịch trình</b></div>
                                <div className='subs-title'>Đặt và quản lý lịch trình</div>
                            </div> */}

                        </div>
                        <div className='right-content'>
                            <div className='support'> <i className='fas fa-question-circle'></i>Support</div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>

                        </div>

                    </div>

                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>QUẢN LÝ LỊCH TRÌNH VÀ</div>
                            <div className='title2'>THÔNG TIN SINH VIÊN</div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type="text" placeholder='Tìm kiếm' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'></div>
                        </div>
                    </div>

                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
