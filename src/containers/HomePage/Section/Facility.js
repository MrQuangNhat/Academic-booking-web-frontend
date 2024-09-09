import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Facility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';


class Facility extends Component {

    render() {


        return (
            <div className='section-share section-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở</span>
                        <button className='btn-section'>thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-facility' />
                                <div>Cơ sở 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-facility' />
                                <div>Cơ sở 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-facility' />
                                <div>Cơ sở 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-facility' />
                                <div>Cơ sở 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-facility' />
                                <div>Cơ sở 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-facility' />
                                <div>Cơ sở 6</div>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
