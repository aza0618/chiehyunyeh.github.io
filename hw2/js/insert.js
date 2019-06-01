$(document).ready(function() {
    $('#submit').on('click', function() {
        if ($('#name').val().trim() == '' || $('#price').val().trim() == '' || $('#number').val().trim() == '' || $('#image').val().trim() == '') {
            $('#message').text('請填入所有欄位')
            $('#dialog').modal('show')
            return 0
        }

        var data = {
            item: {
                name: $('#name').val(),
                price: Number($('#price').val()),
                count: Number($('#number').val()),
                image: $('#image').val(),
            }
        }

        $.post('https://js.kchen.club/B04704075/insert', data, function(response) {
            if (response) {
                if (response.result) {
                    $('#message').text('新增成功')
                    console.log(response.item)
                    $('#dialog').modal('show')
                } else {
                    $('#message').text('新增失敗')
                    console.log(response.message)
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        })
    })

})