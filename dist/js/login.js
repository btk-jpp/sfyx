$(function() {
    $(".btn").click(function() {
      $.get("http://jx.xuzhixiang.top/ap/api/login.php", {
        username: $(".username")
          .val(),
        password: $(".password")
          .val()
      }).then(data => {
        //协议
        if (data.code == 1 && $("#xieyi")[0].checked) {
          location.href = "index.html";
          var uid = data.data.id
          var token = data.data.token
          var username = $(".username").val()
          localStorage.setItem("username", username)
          localStorage.setItem("token", token)
          localStorage.setItem("id", uid)
        } else {
          alert("用户名或者密码错误，请重试！或者请勾选协议");
        }
      });
    });
  });

   