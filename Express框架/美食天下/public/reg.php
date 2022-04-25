<?php 

$username = $_GET['username'];

$arr = ['123456','zhangsan','李四'];


if(in_array($username,$arr)){
	echo '{"success":1}';
}else{
	echo '{"success":0}';
}
