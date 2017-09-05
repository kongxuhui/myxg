define(['jquery','template','util','uploadify','Jcrop','form'],function($,template,util){
	//设置导航菜单选中菜单
	util.setMenu('/course/add');
	//获取课程ID
	var csId = util.qs('cs_id');
	//查询课程封面信息
	$.ajax({
		type : 'get',
		url : '/api/course/picture',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			var html = template('pictureTpl',data.result);
			$('#pictureInfo').html(html);
			//处理课程封面
			$('#upfile').uploadify({
				width : 80,
				height : 'auto',
                buttonText : '选择图片',
                buttonClass : 'btn btn-success btn-sm',
                itemTemplate : '<span></span>',
                fileObjName : 'cs_cover_original',
                formData : {cs_id : csId},
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/cover',
                onUploadSuccess : function (f,data) {
                    var data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                }
            });


			//选中要裁切的图片
			var img = $('.preview img').eq(0);
			var nowCrop = null;
			//图片裁切功能
			function cropImg(){
				img.Jcrop({
					aspectRatio : 2,
					boxWidth : 400
				},function(){
					//销毁原来的实例对象(保证只有一个裁切实例)
					nowCrop && nowCrop.destroy();

					//保存当前实例
					nowCrop = this;

					//计算初始位置
					var width = this.ui.stage.width;
					var height = this.ui.stage.height;
					//计算所选区域的大小
					var x = 0;
					var y = (height - width/2)/2;
					var w = width;
					var h = width/2;
					//创建选区
					this.newSelection();
					this.setSelect([x,y,w,h]);


					//处理所选区域变化的事件

					
					//获取所选区域的参数信息(把选区的参数信息存储到表单中)
					var datas = $('#cropForm').find('input');
					datas.eq(0).val(x);
					datas.eq(1).val(y);
					datas.eq(2).val(w);
					datas.eq(3).val(h);
					
					
					img.parent().on('cropend',function(e,s,c){
						console.log(c);
						//获取所选区域的参数信息(把选区的参数信息存储到表单中)
						datas.eq(0).val(c.x);
						datas.eq(1).val(c.y);
						datas.eq(2).val(c.w);
						datas.eq(3).val(c.h);
					})
					//图片预览功能
					this.initComponent('Thumbnailer',{
						width : 240,
						height : 120,
						mypos : '.thumb'
					})
					$('.jcrop-thumb').css({
						postion : 'fixed',
						top : 0,
						left :0
					})
				})
			}

            $('#cropBtn').click(function(){
            	var flag = $(this).attr('data-flag');
            	if(flag){
            		//点击过了，保存图片,提交页面
            		$('#cropForm').ajaxSubmit({
            			type : 'post',
            			url : '/api/course/update/picture',
            			data : {cs_id : csId},
            			dataType : 'json',
            			success : function(data){
            				console.log(data);
            				if(data.code == 200){
            					location.href = '/course/lesson?cs_id=' + data.result.cs_id;
            				}
            			}
					})
            	}else{
            		//第一次点击，裁切图片

            		//实现裁切功能
            		cropImg();
            		//裁切图片之后，修改按钮状态赋值flag
            		$(this).attr('data-flag',1);
            		$(this).html('保存图片');
            	}
            })
		}
	});
})