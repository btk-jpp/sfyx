$(function () {
	//聚焦失焦input
	$('input').eq(0).focus(function () {
		if ($(this).val().length == 0) {
			console.log($(this).siblings('em'));
			$(this).siblings('em').text("支持中文，字母，数字，'-'，'_'的多种组合");
		}
	})
	$('input').eq(1).focus(function () {
		if ($(this).val().length == 0) {
			$(this).siblings('em').text("建议使用字母、数字和符号两种以上的组合，6-20个字符");
		}
	})
	$('input').eq(2).focus(function () {
		if ($(this).val().length == 0) {
			$(this).siblings('em').text("请再次输入密码");
		}
	})
	// $('input').eq(3).focus(function () {
	// 	if ($(this).val().length == 0) {
	// 		$(this).siblings('em').text("验证完后，你可以使用该手机登陆和找回密码");
	// 	}
	// })
	$('input').eq(3).focus(function () {
		if ($(this).val().length == 0) {
			$(this).parent().next().next("em").text("看不清？点击图片更换验证码");
		}
	})
	//input各种判断
	//用户名：
	$("#submit_btn").attr({ "disabled": "disabled" });
	$("#submit_btn").css({ "background": "#ccc" })
	$('input').eq(0).blur(function () {
		if ($(this).val().length == 0) {
			$(this).siblings('em').text("");
			$(this).siblings('em').css("color", '#ccc');
		} else if ($(this).val().length > 0 && $(this).val().length < 4) {
			$(this).siblings('em').text("长度只能在4-20个字符之间");
			$(this).siblings('em').css("color", 'red');
		} else if ($(this).val().length >= 4 && !isNaN($(this).val())) {
			$(this).siblings('em').text("用户名不能为纯数字");
			$(this).siblings('em').css("color", 'red');
		}
		else {
			$.get(
				"http://jx.xuzhixiang.top/ap/api/checkname.php",
				{
					username: $('input').eq(0).val()
				},
				data => {
					console.log(data)
					$("#submit_btn").attr({ "disabled": "disabled" });
					if (data.code == 1) {
						//用户名可用
						$("#submit_btn").removeAttr("disabled");
						$("#submit_btn").css({ "background": "#6e9b0c" })
						$("#submit_btn").click(function (e) {
							for (var j = 0; j < 4; j++) {
								if ($('input').eq(j).val().length == 0) {
									$('input').eq(j).focus();
									if (j == 3) {
										$('input').eq(j).siblings("em").text("此处不能为空");
										$('input').eq(j).siblings("em").css("color", 'red');
										e.preventDefault();
										return;
									}
									$('input').eq(j).parent().next(".tips").text("此处不能为空");
									$('input').eq(j).parent().next(".tips").css("color", 'red');
									e.preventDefault();
									return;
								}
							}

							$.get(
								"http://jx.xuzhixiang.top/ap/api/reg.php",
								{
									username: $('input').eq(0).val(),
									password: $('input').eq(1).val()
								}
							);
							//协议
							if ($("#xieyi")[0].checked) {
								alert("注册成功");
								location.href = '../html/login.html';
								$("#xieyi")[0].checked
							} else {
								$("#xieyi").next().next().next(".tips").text("请勾选协议");
								$("#xieyi").next().next().next(".tips").css("color", 'red');
								e.preventDefault();
								return;
							}
						})
					} else {
						//用户名不可用
						$($('input').eq(0)).siblings('em').text("用户名重复，请重新输入");
						$($('input').eq(0)).siblings('em').css("color", 'red');
					}
				}
			);
			$(this).siblings('em').text("");
		}
	})





	//密码
	$('input').eq(1).blur(function () {
		if ($(this).val().length == 0) {
			$(this).siblings('em').text("");
			$(this).siblings('em').css("color", '#ccc');
		} else if ($(this).val().length > 0 && $(this).val().length < 6) {
			$(this).siblings('em').text("长度只能在6-20个字符之间");
			$(this).siblings('em').css("color", 'red');
		} else {
			$(this).siblings('em').text("");
		}
	})
	//	确认密码
	$('input').eq(2).blur(function () {
		if ($(this).val().length == 0) {
			$(this).siblings('em').text("");
			$(this).siblings('em').css("color", '#ccc');
		} else if ($(this).val() != $('input').eq(1).val()) {
			$(this).siblings('em').text("两次密码不匹配");
			$(this).siblings('em').css("color", 'red');
		} else {
			$(this).siblings('em').text("");
		}
	})
	// //	手机号
	// $('input').eq(3).blur(function () {
	// 	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
	// 	if ($(this).val().length == 0) {
	// 		$(this).siblings('em').text("");
	// 		$(this).siblings('em').css("color", '#ccc');
	// 	}
	// 	else if (!reg.test($(this).val())) {
	// 		$(this).siblings('em').text("手机号格式不正确");
	// 		$(this).siblings('em').css("color", 'red');
	// 	} else {
	// 		$(this).siblings('em').text("");
	// 	}
	// })
	// 	验证码
	//	 验证码刷新
	function code() {
		var str = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
		var str1 = 0;
		for (var i = 0; i < 4; i++) {
			str1 += str.charAt(Math.floor(Math.random() * 62))
		}
		str1 = str1.substring(1)
		$("#code").text(str1);
		$('#code').css({'background': '#6e9b0c',
			'color': 'white','display': 'inline-block','font-size':'20px'})
	}
	code();
	$("#code").click(code);
	//	验证码验证
	$('input').eq(4).blur(function () {
		if ($(this).val().length == 0) {
			$(this).siblings('em').text("");
			$(this).siblings('em').css("color", '#ccc');
		} else if ($(this).val().toUpperCase() != $("#code").text().toUpperCase()) {
			$(this).siblings('em').text("验证码不正确");
			$(this).siblings('em').css("color", 'red');
		} else {
			$(this).siblings('em').text("");
		}
	})

})