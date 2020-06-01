$(function(){
   // 获取用户
   var username = localStorage.getItem("username");
   var id = localStorage.getItem("id");
   if(username){
     $('.ms-avatar .name').text(username);
     $('.link-myinfo a').text('我的编号'+id);
   }
   if(!username){
       window.location="./login.html";
       alert("请登录，跳转到登陆界面");
   }
})