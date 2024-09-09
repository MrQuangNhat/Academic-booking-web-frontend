export const adminMenu = [
    { //Quản lý người dùng
        name: 'HomePage',
        menus: [
            {
                name: 'manage user react', link: '/system/user-manage'
            },
            {
                name: 'manage user redux', link: '/system/user-redux'
            },

            {
                name: 'Quản lý giáo viên', link: '/system/manage-teacher'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },

            { //Lịch gặp giáo viên
                name: 'Teacher schedule', link: '/teacher/manage-schedule'
            },
        ]
    },
    // {// quản lý học phần
    //     name: 'menu.admin.class',
    //     menus: [
    //         {
    //             name: 'menu.admin.manage-class', link: '/system/manage-class'
    //         },
    //     ]
    // },
    // {// quản lý nhóm
    //     name: 'menu.admin.group',
    //     menus: [
    //         {
    //             name: 'menu.admin.manage-group', link: '/system/manage-group'
    //         },
    //     ]
    // },
];

export const teacherMenu = [
    {
        name: 'HomePage',
        menus: [
            {//Lịch gặp giáo viên
                name: 'Teacher schedule', link: '/teacher/manage-schedule'
            },
            {//Student booking list
                name: 'Student booking list', link: '/teacher/manage-student'
            },

        ]
    }

];

// export const teacherMenu = [
//     {
//         name: 'menu.admin.manage-user',
//         menus: [
//             {//Lịch gặp giáo viên
//                 name: 'menu.student.manage-schedule', link: '/student/manage-schedule'
//             },

//         ]
//     }

// ];