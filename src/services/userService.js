import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service : ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopTeacherHomeService = (limit) => {
    return axios.get(`/api/top-teacher-home?limit=${limit}`)
}

const getAllTeachers = () => {
    return axios.get(`/api/get-all-teachers`)
}

const saveDetailTeacherService = (data) => {
    return axios.post(`/api/save-infor-teacher`, data)
}

const getDetailInforTeacher = (inputId) => {
    return axios.get(`/api/get-detail-teacher-by-id?id=${inputId}`)
}

const saveBulkScheduleTeacher = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleTeacherByDate = (teacherId, date) => {
    return axios.get(`/api/get-schedule-teacher-by-date?teacherId=${teacherId}&date=${date}`)
}

const getProfileTeacherById = (teacherId) => {
    return axios.get(`/api/get-profile-teacher-by-id?teacherId=${teacherId}`)
}

const postStudentBookAppointment = (data) => {
    return axios.post(`/api/student-book-appointment`, data)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopTeacherHomeService,
    getAllTeachers,
    saveDetailTeacherService,
    getDetailInforTeacher,
    saveBulkScheduleTeacher,
    getScheduleTeacherByDate,
    getProfileTeacherById,
    postStudentBookAppointment,
}