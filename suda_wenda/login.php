<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
    <meta name="apple-touch-fullscreen" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta content="telephone=no" name="format-detection" />
	<meta http-equiv="expires" content="0">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
    <title>登陆</title>
<?php 
    error_reporting(E_ERROR | E_PARSE | E_STRICT);
    $callback = 'http://pocketuni.net/index.php?app=home&mod=Public&act=test';
    if(isset($_POST['callback']) && !empty($_POST['callback'])){
        $callback = $_POST['callback'];
    }
    $oClints = array('gez9pqk2','azdp8lp9');
    $oTockens = array('iss37qv8x81cfuhexg0ucm18s98erl8m','h7a8rwkj7av9ym0hwnt2621xhfm6daau');
    $clint = trim($_POST['clint']);
    $tocken = trim($_POST['tocken']);
    $keys = array_keys($oClints, $clint);
    if(empty($keys)){
        echo "认证口令错误！";die;
    }
    if($tocken != $oTockens[$keys[0]]){
        echo "认证口令错误！";
//        Header('Refresh:5; url='."http://" . $callback);
        die;
    }
?>
    <script src="js/fastclick.js"></script>
	<script>
		if ('addEventListener' in document) {
			document.addEventListener('DOMContentLoaded', function() {
				FastClick.attach(document.body);
			}, false);
		}
		var $userId = localStorage.getItem('userId');
		if($userId) {
			location.replace('usercenter.html');
		}
	</script>
    <link href="css/webapp.css" rel="stylesheet" type="text/css" />
</head>
<body ontouchstart="">
	<figure class="topline">
		<span class="s1"></span>
		<span class="s2"></span>
		<span class="s3"></span>
		<span class="s4"></span>
		<span class="s5"></span>
	</figure>
	<article class="logintitle">
		<img src="img/logo.png" width="100" />
		<p>PU平台数据库同步认证</p>
	</article>
	<section class="form4">
		<ul>
			<li>
				<label>PU账号</label>
				<input type="tel" class="inputbox" id="username" name="username" autocomplete="off" maxlength="11" />
			</li>
			<li>
				<label>PU密码</label>
				<input type="password" class="inputbox" id="password" name="password" autocomplete="off" maxlength="30" />
			</li>
		</ul>
	</section>
	<div class="panel">
            <a id="doCheck" href="javascript:void(0)" class="normal regbtn">认证</a>
            <a href="http://m.omzmedia.com/pu/app/index.html" class="normal cancelbtn">取消</a>
	</div>
        <p class="youke">此页面为PU用户登录入口，非PU用户请点击取消使用其他登陆方式</p>
	<script src="js/jquery.js"></script>
<script>
    $('#doCheck').click(function(){
        var clint = "<?php echo $clint;?>";
        var callback = "<?php echo $callback;?>";
        var username = $('#username').val();
        var password = $('#password').val();
        $.post('/index.php?app=home&mod=Public&act=SudaWendaLogin',{clint:clint,callback:callback,username:username,password:password},function( text ){
            var json=$.parseJSON(text);
            if( json.status == 1 ){
                window.location.href = json.data.returnUrl;
            }else{;
                alert(json.info);
            }
        });
    });
</script>
</body>
</html>