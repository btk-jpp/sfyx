;
(function($) {
    $(function() {
        var size = $('.pic').children().size();
        var timer = null;
        $('.pic').css({ 'left': '-1000px' });
        function auto(index) {
            var index = 1;
            timer = setInterval(function() {
                index++;
                if (index > size - 1) {
                    $(".pic").animate({ left: -(index - 1) * 1000 }, 500);
                    index = 1;
                    $(".pic").animate({ left: 0 }, 0);
                }
                $(".pic").animate({ left: -index * 1000 }, 500);
                $('.none li').eq(index - 1).addClass('cur').siblings().removeClass('cur');
                $('.indexbg dd').eq(index - 1).css('display','block').siblings().css('display','none');
            }, 2000)
        }
        auto();
        $(".none li").mouseover(function() {
            var index = $(this).index() + 1;
            $(".pic").stop().animate({ left: -index * 1000 }, 500);
            $('.none li').eq(index - 1).addClass('cur').siblings().removeClass('cur');
            // $('.indexbg dl').animate({ left: (-index + 1) * 1903 }, 0);
            $('.indexbg dd').eq(index - 1).css('display','block').siblings().css('display','none');
        })
        $(".indexW").mouseover(function() { //鼠标移入 定时器取消
            clearInterval(timer);
        })
        $(".indexW").mouseout(function() { //鼠标离开 定时器开启
            var index = $('.cur').index('.none li');
            auto(index);
        })

    })
})(jQuery);