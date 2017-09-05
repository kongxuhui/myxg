define(['jquery','template','util','bootstrap','form'],function($,template,util){
	//设置导航菜单选中菜单
	util.setMenu('/course/list');
	//获取课程ID
	var csId = util.qs('cs_id');
	//根据课程ID获取课时信息
	console.log(1);
	$.ajax({
		type : 'get',
		url : '/api/course/lesson',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			// 渲染页面
			var html = template('lessonTpl',data.result);
			$('#lessonInfo').html(html);


			//提交表单
			function sunbmitForm(url,ctCsId,ctId){
				$('#modalBtn').click(function(){
					var param = {ct_cs_id : ctCsId};
				if(ctId){
					param.ct_id = ctId;
				}
				$('#modalForm').ajaxSubmit({
					type : 'post',
					url : url,
					data : param,
					dataType : 'json',
					success : function(data){
						if(data.code == 200){
							location.reload();
						}
					}
				})
				})
			}

			//实现课时添加功能
			$('#addBtn').click(function(){
				var html = template('modalTpl',{operate : '添加课时'});
				$('#modalInfo').html(html);
				$('#chapterModal').modal();
				sunbmitForm('/api/course/chapter/add',csId);
			});
			$('.editLesson').click(function(){
				$('#chapterModal').modal();
				var ctId = $(this).attr('data-ctId'); 
				//获取最新的课时数据	
				$.ajax({
					type : 'get',
					url : '/api/course/chapter/edit',
					data : {ct_id : ctId},
					dataType : 'json',
					success : function(data){
						data.result.operate = '编辑课时';
						var html = template('modalTpl',data.result);
						$('#modalInfo').html(html);
						sunbmitForm('/api/course/chapter/edit',csId,ctId);
					}
				})

			})
		}

	})
});