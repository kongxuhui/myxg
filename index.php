<?php
//    header('Content-Type:text/html;charset=utf-8');
//    include('./views/main/login.html');
    //路由：根据不用的url导航到不同的页面
//    print_r($__SERVER);
//    var_dump($_SERVER);
    //判断数组中是否包含指定属性 arr_key_exists('PATH_INFO',$_SERVER)
//    $path = $_SERVER['PATH_INFO'];
//    echo $path;

    /*
    规定好URL格式，从而方便页面的导航
    /main/index
    /main/login
    /teacher/list
    */
//    $path = null;
    //默认文件夹名称
    $dir = 'main';
    $filename = 'index';
    if(array_key_exists('PATH_INFO',$_SERVER)){
        $path = $_SERVER['PATH_INFO'];
        //去掉第一个斜杠 php方法 main/index
        $str = substr($path,1);
        //按照/分割目录名称和文件名称
        $arr = explode('/',$str);
        if(count($arr) == 2){
            //覆盖默认的目录名称
            $dir = $arr[0];
            //覆盖默认的文件名称
            $filename = $arr[1];
        }else{
            //跳转到登陆页面
            $filename = 'login';
        }
        //嵌入一个子页面
    }
    include('./views/'.$dir.'/'.$filename.'.html');
?>
