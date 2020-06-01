;
$(".s-top").hide();
$(function(){
  // 增加列表商品
      // $.post("http://jx.xuzhixiang.top/ap/api/goods/goods-add.php", {
      //   pname: "中粮家佳康 奥尔良烤翅中 300g",
      //   pprice: 36.8,
      //   pimg: "http://p02.sfimg.cn/2016/1800235725/middle_1800235725_9_01.jpg",
      //   pdesc: "已有1879人评价",
      //   uid: id,
      // }).then(data => {
      //   console.log(data);
      // });
  
// 关闭头部
$(".topshow .close").click( function () { 
    console.log($(".topshow .close"));
    $(".topshow").slideUp("slow");
  });
  //导航
  $('.categories').hover(
      function(){
        $("#allSort").show();
      },
      function(){
        $('#allSort').css('display','none');
      })
// 地区选择
$(".tShow").hover(
    function () {
        $('.tShow .dd').css('display','block');
        $('.tShow .dd li').click(function(){
          $('.city_title1').html($(this).html());
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
// 点击展开列表
$('.catitem h3').mousedown(function(){
  $(this).siblings().slideToggle(30);
})

    // 获取用户
    var username = localStorage.getItem("username");
    var id = localStorage.getItem("id");
    var city = localStorage.getItem('city');
    $('.city_title1').text(city);
    if(username){
      $('#login>span').text(username+',欢迎您！');
      $('#login>.exit').css('display','block');
      $('#login>.dl').css('display','none');
    }
    if(!username){
        // window.location="./login.html";
        // alert("请登录，跳转到登陆界面");
    }
        $('#login>.exit').click(function(){
            $('#login>span').text('嘿，欢迎来顺丰优选！');
            window.localStorage.removeItem('uList');
            $('#login>.dl').css('display','block');
            $('#login>.exit').css('display','none');
    })
    
      $.get("http://jx.xuzhixiang.top/ap/api/productlist.php", {
        uid: id
      }).then(data => {
        data = data.data;
        var arr = data;
        var str = '';
        arr.forEach(val => {
          str += `<li>
          <div class="l-wrap">
              <div class="pic">
              <a href="../html/details.html?id=${val.pid}">
                  <img src="${val.pimg}" alt="">
              </a>
              </div>
              <div class="price">
                  <span class="p-now">￥<strong>${val.pprice}</strong>
                  </span>
              </div>
              <div class="title">
              ${val.pname}
              </div>
              <div class="title-a">
                  超值特惠
              </div>
              <p class="active">限时抢</p>
              <div class="comment">${val.pdesc}
                  <div class="owner_shop_list">自营</div>
              </div>
              <div class="action" data-id="${val.pid}">
                  <div class="p-num">
                      <button class="minus">-</button>
                      <input type="text" value="1" class="nums">
                      <button class="add">+</button>
                  </div>
                  <div class="p-btn">
                      加入购物车
                  </div>
              </div>
          </div>
      </li>`
          
        });
        $('.list-all').html(str);
         // 飞入购物车效果
    var offset = $(".s-cart").offset(); 
    $(".p-btn").click(function(event){ 
        console.log(1);
        var addcar = $(this); 
        var img = addcar.parent().parent().find('img').attr('src'); 
        var flyer = $('<img class="u-flyer" src="'+img+'">'); 
        flyer.fly({ 
            start: { 
                left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
                top: event.pageY //开始位置（必填） 
            }, 
            end: { 
                left: offset.left+10, //结束位置（必填） 
                top: offset.top+10, //结束位置（必填） 
                width: 0, //结束时宽度 
                height: 0 //结束时高度 
            }, 
            onEnd: function(){ //结束回调 
                $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息 
                // addcar.css("cursor","default").removeClass('orange').unbind('click'); 
                // this.destory(); //移除dom 
            } 
        }); 
    }); 
          // 加减
        $('.minus').click(function(){
          $(this).next().val(parseInt($(this).next().val()) - 1);
          if (parseInt($(this).next().val()) <= 1) {
              $(this).next().val(1);
          }
          $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                pid: $(this)
                .parent().parent()
                .attr("data-id"),
                uid: id,
                pnum: $(this).next().val()
            }), function (data) {
                
            };
        })
        $(".add").click(function() {
          $(this).prev().val(parseInt($(this).prev().val()) + 1)
          $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                pid: $(this)
                .parent().parent()
                .attr("data-id"),
                uid: id,
                pnum: $(this).prev().val()
            }).then(data => {
            });
      });
      $(".p-btn").click(function () {
        //添加商品
        $.get('http://jx.xuzhixiang.top/ap/api/add-product.php', {
            uid: id,
            pid:$(this)
            .parent()
            .attr("data-id"),
            pnum: $(this).siblings().find($('.nums')).val()
        }, function (data) {
        });
    });
    });
   
    
   
      
})