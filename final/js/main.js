$(document).ready(function() {
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

    getDate = function(now, day) {
        var x = new Date(now.getTime() + (day - 1) * 24 * 60 * 60 * 1000)
        var day = ("0" + x.getDate()).slice(-2)
        var month = ("0" + (x.getMonth() + 1)).slice(-2)
        var today = x.getFullYear() + "-" + (month) + "-" + (day)
        return (today)
    }

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
            $Plus = $('<td>').attr('class', 'col-1').attr('value', String(i)).append($('<button>').append($('<i>').attr('class', 'fas fa-plus')))

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

    $('#search-button').on('click', function() {

        $('#planner-table').empty()

        var start_date = $('#from-date').val()
        var end_date = $('#to-date').val()

        if (start_date == '' || end_date == '') {
            $('#error').empty()
            $error = $('<h3>').text('Please input start date and end date of your trip.')
            $('#error').append($error)
            $('#error').show()
            return 0
        }

        var date1 = new Date(start_date);
        var date2 = new Date(end_date);

        if (date1.getTime() > date2.getTime()) {
            $('#error').empty()
            $error = $('<h3>').text('Invalid input date, please check again.')
            $('#error').append($error)
            $('#error').show()
            return 0
        }

        var diffTime = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


        addPlannerBlock(Number(diffDays) + 1)
    })


    newRow = function() {
        $optSpot = $('<option>').text('Attraction')
        $optFood = $('<option>').text('Food')
        $optHotel = $('<option>').text('Hotel')
        $optPlane = $('<option>').text('Airplane')
        $optTrain = $('<option>').text('Train')
        $optBus = $('<option>').text('Bus')
        $optMetro = $('<option>').text('Metro')
        $optCar = $('<option>').text('Car')
        $optWalk = $('<option>').text('Walk')
        $optBoat = $('<option>').text('Ship')
        $optTrans = $('<optgroup>').attr('label', 'Transport').append($optPlane).append($optTrain).append($optBus).append($optMetro).append($optCar).append($optWalk).append($optBoat)
        $optOther = $('<option>').text('Others')
        $selectOpt = $('<select>').attr('class', 'selectpicker ml-3')
        $icon = $('<i>').attr('class', 'fas fa-umbrella-beach select-icon')
        $inputType = $('<td>').attr('class', 'col-2 selectors').append($icon).append($selectOpt.append($optSpot).append($optFood).append($optHotel).append($optTrans).append($optOther))

        $($selectOpt).on('change', function() {
            var newIcon = $(this).val()
            if (newIcon == 'Attraction') {
                $(this).siblings('i').attr('class', 'fas fa-umbrella-beach select-icon')
            } else if (newIcon == 'Food') {
                $(this).siblings('i').attr('class', 'fas fa-utensils select-icon')
            } else if (newIcon == 'Hotel') {
                $(this).siblings('i').attr('class', 'fas fa-bed select-icon')
            } else if (newIcon == 'Airplane') {
                $(this).siblings('i').attr('class', 'fas fa-plane select-icon')
            } else if (newIcon == 'Train') {
                $(this).siblings('i').attr('class', 'fas fa-train select-icon')
            } else if (newIcon == 'Bus') {
                $(this).siblings('i').attr('class', 'fas fa-bus select-icon')
            } else if (newIcon == 'Metro') {
                $(this).siblings('i').attr('class', 'fas fa-subway select-icon')
            } else if (newIcon == 'Car') {
                $(this).siblings('i').attr('class', 'fas fa-car-side select-icon')
            } else if (newIcon == 'Walk') {
                $(this).siblings('i').attr('class', 'fas fa-walking select-icon')
            } else if (newIcon == 'Ship') {
                $(this).siblings('i').attr('class', 'fas fa-ship select-icon')
            } else if (newIcon == 'Others') {
                $(this).siblings('i').attr('class', 'fas fa-suitcase select-icon')
            }
        });

        $fromTime = $('<input>').attr('type', 'time').attr('class', 'form-control set-time')
        $toTime = $('<input>').attr('type', 'time').attr('class', 'form-control set-time')
        $inputTime = $('<td>').attr('class', 'col-2 px-1 time-block').append($fromTime).append($('<p>').attr('id', 'to').text(' to ')).append($toTime)
        $inputSpot = $('<td>').attr('class', 'col').append($('<input>').attr('placeholder', ' Spot').attr('class', 'w-100'))
        $inputNote = $('<td>').attr('class', 'col').attr('id', 'note-area').append($('<textarea>').attr('placeholder', ' Note').attr('class', 'w-100'))
            // $inputCheck = $('<button>').text('check')

        $inputDelete = $('<button>').append($('<i>').attr('class', 'fas fa-trash-alt'))
        $($inputDelete).on('click', function() {
            $(this).parent('td').parent('tr').remove()
        })

        $inputButton = $('<td>').attr('class', 'col-1').append($inputDelete)
        $tr = $('<tr>').attr('class', 'row').append($inputType).append($inputTime).append($inputSpot).append($inputNote).append($inputButton)
        return ($tr)
    }







});