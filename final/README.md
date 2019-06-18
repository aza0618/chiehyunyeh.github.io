# 前端程式設計 期末專案

## 網站設計理念

URTrips是一個旅遊行程規劃網站，可以按照旅遊日期客製行程規劃表，並詳細編列每天的細項規劃，包含景點、交通、住宿、用餐等，全部完成後可以藉由列印、或另存為pdf檔的方式輸出檔案，也可以傳送給其他旅伴一同使用。

## 功能說明簡介

* 封面頁
  
  * 點擊Start Your Trip 進入主頁

* 主頁

  * Navbar

    * 點擊URTrips返回封面頁
    
    * 預設日期起訖時間自動從電腦抓今日及明日日期

    ```javascript
    var now = new Date()
    var day = ("0" + now.getDate()).slice(-2)
    var month = ("0" + (now.getMonth() + 1)).slice(-2)
    var today = now.getFullYear() + "-" + (month) + "-" + (day)
    $('#from-date').val(today)

    var tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    day = ("0" + tomorrow.getDate()).slice(-2)
    month = ("0" + (tomorrow.getMonth() + 1)).slice(-2)
    tomorrow = tomorrow.getFullYear() + "-" + (month) + "-" + (day)
    $('#to-date').val(tomorrow)
    ```
    
    * 若不想設定今明天，也可以自訂輸入其他日期起訖

    * 輸入完成後點擊Start，會自動計算總天數，並在下方顯示相對應數量的表格，包含每個表格的天數和日期
    
    ```javascript
    var date1 = new Date(start_date)
    var date2 = new Date(end_date)
    var diffTime = Math.abs(date2.getTime() - date1.getTime())
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    addPlannerBlock(Number(diffDays) + 1)
    
    addPlannerBlock = function(day_num) {
        $('#error').hide()
        var from = $('#from-date').val().split("-")
        from = new Date(from[0], from[1] - 1, from[2])
        for (i = 1; i <= day_num; i++) {
            $Title = $('<h3>').text("Day " + String(i) + ' : ' + getDate(from, i))
            $titleDiv = $('<div>').attr('class', 'row day py-3').append($Title)

            $Type = $('<td>').text("TYPE").attr('class', 'col-2')
            $Time = $('<td>').text("TIME").attr('class', 'col-2')
            $Spot = $('<td>').text("SPOT").attr('class', 'col')
            $Note = $('<td>').text("NOTE").attr('class', 'col')
            $Plus = $('<td>').attr('class', 'col-1').attr('value',  String(i)).append($('<button>').append($('<i>').attr('class', 'fas fa-plus')))

            $($Plus).on('click', function() {
                $selectTable = $('#table-' + $(this).attr('value'))

                $($selectTable).append(newRow())
            })

            $th = $('<th>').attr('class', 'row').append($Type).append($Time).append($Spot).append($Note).append($Plus)

            $table = $('<table>').attr('class', 'container').attr('id', 'table-' + String(i)).append($th).append(newRow())

            $div = $('<div>').attr('class', 'container text-center py-3').append($titleDiv).append($table)
            $('#planner-table').append($div)
        }
    }
    
    ```

  * 編輯區

    * 表格TYPE欄在下拉選單選擇行程類型後，左側之icon則會顯示對應圖形

    * 表格TIME欄可分別選取開始時間和結束時間

    * 表格SPOT欄輸入景點名稱，屬於僅可新增單行內容的input物件

    * 表格NOTE欄輸入備註事項，屬於可以新增多行內容的text area
    
    * 點擊最右欄上方的➕，則會在該表格最下方加入一列

    * 點擊每列最右欄的垃圾桶icon，則會刪除該列

