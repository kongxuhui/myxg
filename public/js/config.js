require.config({
    baseUrl : '/public/assets',
    paths : {
        jquery : 'jquery/jquery.min',
        cookie : 'jquery-cookie/jquery.cookie',
        template : 'artTemplate/temlate-web',
        bootstrap : 'bootstrap/js/bootstrap.min',
        datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker.min',
        language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate : 'validate/jquery-validate',
        form : 'jquery-form/jquery.form',
        login : '../js/login',
        common : '../js/common',
        index : '../js/index',
        util : '../js/util',
        teacheradd : '../js/teacheradd',
        teacherlist : '../js/teacher-list'

    },
    shim : {//把非标准模块转化为标准模块
        bootstrap : {
            deps : ['jquery']
        },
        language : {
            deps : ['jquery','datepicker']
        },
        validate : {
            deps : ['jquery']
        }
    }
})
