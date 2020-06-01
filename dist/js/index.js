// 顶部图片
function showAuto(){
    $(".banner").slideUp("slow",function(){
        $(".banner").css({'display':'none'});
        $(".topshow").css({'display':'block'});
    });
}
setTimeout("showAuto()", 3000);
var city = localStorage.getItem('city');
    $('.city_title1').text(city);
$(function(){
  // 关闭头部
  $(".topshow .close").click( function () { 
    console.log($(".topshow .close"));
    $(".topshow").slideUp("slow");
  });
  
  // 地区选择
    $(".tShow").hover(
        function () {
            $('.tShow .dd').css('display','block');
            $('.tShow .dd li').click(function(){
            var cityTitle = $('.city_title1').html($(this).html());
            var city = cityTitle.text();
            localStorage.setItem("city",city);
            })
        },
        function () {
            $('.tShow .dd').css('display','none');
        }
      );

    $('.off').click(function (){
        $('.tShow .dd').css('display','none');
        console.log(1);
        console.log($('.tShow .dd'));
    })
    //进入列表页
    $('.navmenu').hover(function(){
      $('.navmenu a').click(function(){
        location.href = "list.html";
      })
    },
    function(){
      $('.i-close').click(function(){
        $('.navmenu .i-cm').css('display','none');
      })
    })
});

// 回到顶部
$(".s-top").hide();
    //当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
    $(function() {
      $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
          $(".s-top").fadeIn(200);
        } else {
          $(".s-top").fadeOut(200);
        }
      });
      //当点击跳转链接后，回到页面顶部位置
      $(".s-top").click(function() {
        $('body,html').animate({
          scrollTop: 0
        },
        500);
        return false;
      });
    });
