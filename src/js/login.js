require(["config"], function(){
	require(["jquery","headerFooter", "cookie"], function($){
		var username = false,
			password = false,
			status;

		$("#btnLogin").on("click", function(){
			$.post("http://localhost/php/login.php",
			{
				username:$("#txtUserName").val(),
				password:$("#txtPass").val()
			},
			function(respData){	
				if(respData.status == 1){
					if(username && password && status){
						var user = respData.data;
						$.cookie("login_user",JSON.stringify(user), {path:"/"});
						alert("登录成功，点击确定跳转到首页");
						location = "../index.html";
					}
				}else{
					alert("登录失败");			
				}
			}, "json"
			);
		});
		$("#txtUserName").on("blur", function(){
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if(!reg.test($("#txtUserName").val())){
				$("#message").text("手机号码格式错误，请重新输入").show();
			}else if($("#txtUserName").val().length == 0){
				$("#message").text("请输入11位手机号码").show();
			}else{
				$("#message").hide();
				username = true;
			}
		});

		$("#txtPass").on("blur", function(){
			var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
			if(!reg.test($(this).val())){
				$("#message").text("输入密码有误，请重新输入").show();
			}else{
				$("#message").hide();
				password = true;
			}
		});
		$("#ckLogin1").on("click", function(){
			status = $("#ckLogin1").checked;
		});
	});
});