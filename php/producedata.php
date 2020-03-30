<?php
//1.设置字符编码
header('content-type:text/html;charset=utf-8');
//2.数据库连接
define('HOST', 'localhost'); //主机名
define('USERNAME', 'root'); //用户名
define('PASSWORD', ''); //密码，如果没有密码，直接设为空define('PASSWORD', '');
define('DBNAME', 'hw'); //数据库的名称
$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error) {
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}

//3.通过sql语句查找所有的数据，将其输出为json格式(前端所有)
$sql = "select * from produce1";

$result = $conn->query($sql); //获取数据的结果集(记录集)
//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);//输出接口


?>