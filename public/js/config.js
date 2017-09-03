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
        settings : '../js/settings',
        login : '../js/login',
        common : '../js/common',
        region : 'jquery-region/jquery.region',
        ckeditor : 'ckeditor/ckeditor',
        nprogress : 'nprogress/nprogress',
        state : '../js/state',
        index : '../js/index',
        util : '../js/util',
        teacheradd : '../js/teacheradd',
        teacherlist : '../js/teacher-list',
        uploadify : 'uploadify/jquery.uploadify.min'
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
        },
        uploadify : {
            deps : ['jquery']
        },
        ckeditor :{
            exports : 'CKEDITOR'
        }
    }
})
