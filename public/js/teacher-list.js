define(['jquery','template'],function ($,template) {
    //请求后台接口，获取列表数据
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function (data) {
            var html = template('teacherTpl',{list : data.result});
            $('#teacherInfo').html(html);
        }
    });
});