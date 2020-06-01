;
$(function(){
    var pid = location.search.split("=")[1]
    var id = localStorage.getItem("id");
    var city = localStorage.getItem('city');
    $('.city_title1').text(city);
    $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
        id: pid,
    }, function (data) {
        var str ='';
        str = `<img id="bigimg" src='${data.data.pimg}' alt="">`;
        $('.price').html(`${data.data.pprice}`);
        $('.pname').html(`${data.data.pname}`);
        $('.left_1').html(str);
        $('.pj').html(`${data.data.pdesc}`);
        $('.number').html(`商品编号：${pid}`);
            // 加减
        $('.jian').click(function(){
            $(this).prev().val(parseInt($(this).prev().val()) - 1);
            if (parseInt($(this).prev().val()) <= 1) {
                $(this).prev().val(1);
                $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                    pid: pid,
                    uid: id,
                    pnum: $('.nums').val()
                }).then(data => {
                });
            }
        })
        $(".add").click(function() {
            $(this).next().val(parseInt($(this).next().val()) + 1);
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                pid: pid,
                uid: id,
                pnum: $('.nums').val()
            }).then(data => {
            });
        });
        $("#addcars").click(function () {
            //添加商品
            $.get('http://jx.xuzhixiang.top/ap/api/add-product.php', {
                uid: id,
                pid: pid,
                pnum: $(".nums").val()
            }, function (data) {
                console.log(data);
                location.href = "carts.html";
            });
        });
        
    });
    // 获取用户
    var username = localStorage.getItem("username");
    if(username){
    $('#login>span').text(username+',欢迎您！');
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
    //导航
  $('.categories').hover(
    function(){
      $("#allSort").show();
    },
    function(){
      $('#allSort').css('display','none');
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
    // 回到顶部
//当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
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
// 评论区滚动

