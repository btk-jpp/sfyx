;
(function($) {
    $(function() {
        $('.a-img').mouseover(function() {
            var index = $(this).index();
            // console.log(index);
            $('.rmask').eq(index).removeClass('qur').parent().siblings().children('.rmask').addClass('qur');
        })
        $('.a-img').mouseout(function() {
            $('.rmask').removeClass('qur');
        })
        // 获取用户
        var username = localStorage.getItem("username");
        var token = localStorage.getItem("token");
        var id = localStorage.getItem("id");
        if(username){
        $('#login span').text(username+',欢迎您！');
        $('#login>.exit').css('display','block');
        $('#login>.dl').css('display','none');
        }
        $('#login>.exit').click(function(){
            $('#login>span').text('嘿，欢迎来顺丰优选！');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('id');
            window.localStorage.removeItem('token');
            $('#login>.dl').css('display','block');
            $('#login>.exit').css('display','none');
        })
    })
})(jQuery)