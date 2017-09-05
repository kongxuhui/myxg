define(['jquery'],function ($) {
    //工具函数
    return {
        setMenu : function (path) {
            $('.navs a[href="'+path+'"]').addClass('active').closest('ul').show();
        },
        qs : function (key) {
            //获取url参数中指定的参数值
            var param = location.search.substring(1);
            var result = null;
            console.log(param);
            if(param){
                var kvs = param.split('&');
                $.each(kvs,function (i, item) {
                    var kv = item.split('=');
                    if(key == kv[0]){//找到对应的参数
                        result = kv[1];
                        return false;  // 终止循环
                    }
                });
            }
            return result;
        }
    };
});