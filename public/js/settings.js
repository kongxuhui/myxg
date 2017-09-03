define(['jquery','template','util','ckeditor','datepicker','language','uploadify','region','validate','form','state'],function ($,template,util,CKEDITOR) {
    //设置导航菜单选中
    util.setMenu('/main/index');
    //调用后台接口，获取所有的个人信息
    $.ajax({
        type : 'get',
        url : '/api/teacher/profile',
        dataType : 'json',
        success : function (data) {
            //解析数据渲染页面
            var html = template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
            // 处理头像上传
            $('#upfile').uploadify({
                width : 120,
                height : 120,
                buttonText : '',
                itemTemplate : '<span></span>',
                fileObjName : 'tc_avatar',
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                onUploadSuccess : function (f,data) {
                    var data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                }
            });
            $('#select').region({
                url : '/public/assets/jquery-region/region.json'
            });
            //处理富文本
            CKEDITOR.replace('editor');
            //处理表单提交
            $('#settingForm').validate({
                sendForm : false,
                valid : function () {
                    //同步富文本信息到textarea中
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();

                    var homedown = p + '|' + c + '|' + d;
                    //提交表单
                    $(this).ajaxSubmit({
                        type : 'post',
                        url : '/api/teacher/modify',
                        data : {tc_hometown : homedown},
                        dataType : 'json',
                        success : function (data) {
                            if(data.code == 200){
                                location.reload();
                            }
                        }
                    });
                }
            });
        }
    });
});