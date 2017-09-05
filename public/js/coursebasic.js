define(['jquery','template','util','validate','form'],function($,template,util){
	//设置导航菜单选中菜单
	util.setMenu('/course/add');
	//获取课程ID
	var csId = util.qs('cs_id');

	//添加和编辑的标志位
	var flag = util.qs('flag');
	//调接口，获取数据，渲染页面
	$.ajax({
		type : 'get',
		url : '/api/course/basic',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			if(flag != '1'){
				//编辑（根据课程ID查询课程详细信息，填充页面）
				data.result.operate = '课程编辑';
				//解析数据  渲染页面
				var html = template('basicTpl',data.result);
				$('#basicInfo').html(html);
			}else{
				//添加
				data.result.operate = '课程添加';
				var html = template('basicTpl',data.result);
				$('#basicInfo').html(html);
			}
			//处理二级分类的下拉联动
			$('#firstType').change(function(){
				$.ajax({
					type : 'get',
					url : '/api/category/child',
					data : {cg_id : $(this).val()},
					dataType : 'json',
					success : function(data){
						var nt = '<option value="0">--请选择--</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
						var html = template.render(nt,{list:data.result});
						$('#nextType').html(html);
					}
				})
			})
			//处理表单提交
			$('#basicForm').validate({
				sendForm : false,
				valid : function(){
					$(this).ajaxSubmit({
						type : 'post',
						url : '/api/course/update/basic',
						data : {cs_id : csId},
						dataType : 'json',
						success : function(data){
							// console.log(data);
							if(data.code == 200){
								location.href = '/course/picture?cs_id='+data.result.cs_id;
							}
						}
					})
				}
			})
		}
	})
	
})