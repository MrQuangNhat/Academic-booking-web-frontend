import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: [],
    users: [],
    topTeachers: [],
    allTeachers: [],
    allScheduleTime: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState = { ...state };
            copyState.roles = action.data;
            return {
                ...copyState,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_TEACHERS_SUCCESS:
            state.topTeachers = action.dataTeachers;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_TEACHERS_FAILED:
            state.topTeachers = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHERS_SUCCESS:
            state.allTeachers = action.dataSt;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHERS_FAILED:
            state.allTeachers = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;