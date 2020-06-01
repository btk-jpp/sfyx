;$(function(){
    
    var id = localStorage.getItem("id");
    var token = localStorage.getItem("token");
    $.get("http://jx.xuzhixiang.top/ap/api/productlist.php", {
        uid: id
      }).then(data => {
        data = data.data;
        var arr = data;
        var str = '';
        arr.forEach((val,i) => {
          str += `
          <tr> 
            <th scope="row">${i+1}</th> 
            <td class='fimg'><img src="${val.pimg}" alt="" class="pimg"></td> 
            <td class="price">${val.pprice}</td> 
            <td class="pname">${val.pname}</td> 
            <td class="pdesc">${val.pdesc}</td>
            <td>
            <button type="button" class="btn btn-danger del"  data-id="${val.pid}">删除</button>
            <button type="button" class="btn btn-success update" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">修改</button>
            </td> 
          </tr>
          `
        });
        $('table tbody').html(str);
        // 删除
        $(".btn-danger").click(function() {
          $.get("http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php", {
              pid: $(this).attr("data-id"),
              uid: id,
              token: token
          }).then(data => {
              console.log(data);
              $(this)
              .parent().parent()
              .remove();
          });
      });
      // 模态框
     $('.update').click(function(){
        $('#ppname').val($(this).parent().parent().children('.pname').text());
        $('#pprice').val($(this).parent().parent().children('.price').text());
        $('#ppdesc').val($(this).parent().parent().children('.pdesc').text());
        $('#img').val($(this).parent().parent().find("img")[0].src);
        $(".xg").click(()=> {
          console.log($('#ppname').val())
          $.get("http://jx.xuzhixiang.top/ap/api/goods/goods-update.php", {
            pid: $(this).parent().children('.del').attr("data-id"),
            pname:$('#ppname').val(),
            pprice:$('#pprice').val(),
            pdesc:$('#ppdesc').val(),
            pimg:$('#img').val()
          }).then(data => {
              console.log(data);
              $('#exampleModal').modal('hide');
              location.reload()
          });
        })
     })
      
    })
})