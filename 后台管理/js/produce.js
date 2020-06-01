;$(function(){
    // http://p02.sfimg.cn/2016/1800235725/middle_1800235725_9_01.jpg
    var uid = localStorage.getItem("id");
    $('.sub_home input').click(function(e) {
        e.preventDefault();
        $.post("http://jx.xuzhixiang.top/ap/api/goods/goods-add.php", {
           pname: $('.pname').val(),
           pprice: $('.pprice').val(),
           pimg: $('.img').val(),
           pdesc: "已有"+$('.pdesc').val()+"人评价",
           uid: uid,
         }).then(data => {
           console.log(data);
           location.href="./tables.html" 
         });
    })
})