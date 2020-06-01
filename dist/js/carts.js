;

$(function(){
    var uid = localStorage.getItem("id");
    $.get('http://jx.xuzhixiang.top/ap/api/cart-list.php', {
        id: uid
    }, function (data) {
        data = data.data;
        var arr = data;
        arr.forEach(function (val) {
            var str = `<tr data-id="${val.pid}">
                        <td><label><input type="checkbox" class="check"><img src="${val.pimg}" alt=""></label></td>
                        <td>${val.pname}</td>
                        <td>${val.pprice}</td>
                        <td><button class="jian">-</button>
                            <input type="text" value=${val.pnum} class="nums">
                            <button class="add">+</button></td>
                        <td class="sumsp">
                          <h3>${val.pprice * val.pnum}</h3>     
                        </td>           
                        <td><a href="javascript:void(0)" class="delthis" >删除</a></td>
                    </tr>`;
            $("tbody").append(str);
        })
        // 总计
        $('#all').on('click',function(){
            $(".check").prop("checked", this.checked);  
            if($('#all').is(':checked')){
                total();
                $('#pnum').text($(".check").length)
            }else{
                $("#total").text('0');
                $('#pnum').text('0');
            }
        })
        $(".check").on('click',function() {  
        var $subs = $(".check");  
        $("#all").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);  
        if($('#all').is(':checked')){
            total();
            $('#pnum').text($(".check").length)
        }else{
            $("#total").text('');
            $('#pnum').text('0');
        }
        })
        // 总计
        function total(){
            var total = 0;
            $('tbody tr').each(function(){
                total += parseFloat($(this).find($('.sumsp h3')).text());
                $("#total").text(total);
            })
        }
        // 加减
        $('.jian').click(function(){
            $(this).next().val(parseInt($(this).next().val()) - 1)
            if (parseInt($(this).next().val()) <= 1) {
                $(this).next().val(1);
            }
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                pid: $(this)
                .parent().parent()
                .attr("data-id"),
                uid: uid,
                pnum: $(this).next().val()
            }), function (data) {
                console.log(data);
            };
        })
        $(".add").click(function() {
            $(this).prev().val(parseInt($(this).prev().val()) + 1)
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                pid: $(this)
                .parent().parent()
                .attr("data-id"),
                uid: uid,
                pnum: $(this).prev().val()
            }).then(data => {
                console.log(data);
            });
        });
        $(".nums").on('change',function() {
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                pid: $(this)
                .parent().parent()
                .attr("data-id"),
                uid: uid,
                pnum: $(this).val()
            }).then(data => {
                console.log(data);
            });
        });
        
        // 删除
        $(".delthis").click(function() {
            $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", {
                pid: $(this)
                .parent().parent()
                .attr("data-id"),
                uid: uid
            }).then(data => {
                console.log(data);
                $(this)
                .parent().parent()
                .remove();
            });
        });
    })
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
})