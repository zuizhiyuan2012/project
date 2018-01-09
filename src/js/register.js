require(["config"], function(){
	require(["jquery","headerFooter"], function($){
		var username = true,
			password = true,
			passAgain = true,
			imgCode = true,
			isUsernameExist = false;
		
		//验证手机号是否正确
		$("#txtPhoneNo").on("blur", function(){
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if(!reg.test($("#txtPhoneNo").val())){
				$("#emPhoneNo").html("请输入11位有效手机号码").show();
				// $("#txtPhoneNo").css({
				// 	"border":"1px solid #e92d2f;"
				// });				
			}else{		
				$("#emPhoneNo").hide();
				username = true;
			}
		});
		
		//验证登录密码是否正确
		$("#txtPass").on("blur", function(){
			if($("#txtPass").val().length == 0){				
				$("#emPass").show().html("请输入密码");
			}else{
				$("#emPass").addClass("e2");
				$("#emPass").show();
				password = true;
			}
		});
		//确认登录密码是否正确
		$("#txtPassConfirm").on("blur", function(){	
			var tpc = $("#txtPass").val();	
			if($("#txtPassConfirm").val() !== tpc){
				$("#emPassConfirm").addClass("e1");
				$("#emPassConfirm").html("两次输入密码不一致").show();
			}else{
				$("#emPassConfirm").hide();
				passAgain = true;
			}
		});

		//验证码的格式的判定；
		$("#txtPicCode").on("blur", function(){	
			if($("#txtPicCode").val().length !== 4){
				$("#emPicCode").addClass("e1").show();			
			}else{
				$("#emPicCode").removeClass("e1");
			}
		});	
	 	//阅读协议选项框
		var status = $("#btnAgree").prop("checked");

		//接收验证码
		function generateCode() {
			$.ajax({
				type: "get",
				url: "http://route.showapi.com/932-2",
				data: {
					showapi_appid:"29550",
					showapi_sign:"08402fce064a484baad949d9a18f75e7",
				},
				dataType: "json",
				success: function(data) {
					var val = data.showapi_res_body;

					$("#Verify_codeImag").attr({
						"src": val.image
					});
					$("#Verify_codeImag").attr({
						"sid": val.sid
					}); // 添加自定义属性，保存关联标识				
				}
			});
		}
		generateCode();
		//点击换一张时换张
		$("#Verify_codeImag").on("click", function() {	
			generateCode();
		});
		$("#btnPhoneRegister").on("click", function() {

			$.ajax({
				type: "get",
				url: "http://route.showapi.com/932-1",
				data: {
					showapi_appid:"29550",
					showapi_sign:"08402fce064a484baad949d9a18f75e7",
					checkcode: $("#txtPicCode").val(),
					sid: $("#Verify_codeImag").attr("sid")
				},
				dataType: "json",
				success: function(data) {

					if (data.showapi_res_body.valid) {
						imgCode=true;
					} else {
						$("#emPicCode").text("验证码输入有误");
					}
				}
			});
		});
		
	// //登录验证
		var isUsernameExist = true; // 标记用户名是否存在 true:存在   false:不存在
		$("#txtPhoneNo").on("blur" , function() {
			/* 使用ajax动态验证用户名是否已存在 */
			console.log("a")
			$.ajax({
				type : "get",
				url : "http://localhost/php/check.php",
				data : {username : $("#txtPhoneNo").val()},
				dataType : "json",
				success : function(respData){
					console.log("bbbb")
					if (respData.status === 1){
						$("#emPhoneNo").text("用户名已占用").show();
						
					} else {
						console.log("可用");
						$("#emPhoneNo").removeClass();
						isUsernameExist = false;
					}
				}
			});
		});

		$("#btnPhoneRegister").on("click",function(){
			console.log("注册");
			if (username&&password&&passAgain&&imgCode&&status) {			
				/* 通过ajax向服务器发送注册用户信息，保存注册用户 */
				$.ajax({
					type : "post",
					url : "http://localhost/php/register.php",
					data : {
						username : $("#txtPhoneNo").val(),
						password : $("#txtPass").val()
					},
					dataType : "json",
					success : function(data){
						
						console.log(data)
						if (data.status === 1) { // 注册成功
							alert("注册成功，即将前往登录页面")
							location = "/../html/login.html";
						} else {
							alert("注册失败")
						console.log("shibai");
						}
					}
				});
			}else if(!imgCode){
				alert("验证码有误")
			}else if(!status){
				alert("请阅读协议")
			}
		});
	});
});