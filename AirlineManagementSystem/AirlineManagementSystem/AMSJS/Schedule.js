
var isairlineValid = false;
var isrouteValid = false;
var isdeparturedateValid = false;
var isdeparturetimeValid = false;
var isarrivaltimeValid = false;
var isstatusValid = false;

function validdate(txt, msg, data) {
    debugger;
    if ($(txt).val() == "") {
        var mymsg = data + ' is required';
        $(txt).css("border-color", "red");
        $(msg).html(mymsg);
        $('#btnSubmit').css("Enabled", "false");
        return false;
    }
    else {

        $(txt).css("border-color", "green");
        $(msg).html("");
        $('#btnSubmit').css("Enabled", "true");
        return true;
    }
}

function validdateDropDowns(txt, msg, data) {
    debugger;
    if ($(txt + ' option:selected').val() == "-1") {
        var mymsg = data + ' is required';
        $(txt).css("border-color", "red");
        $(msg).html(mymsg);
        $('#btnSubmit').css("Enabled", "false");
        return false;
    }
    else {

        $(txt).css("border-color", "green");
        $(msg).html("");
        $('#btnSubmit').css("Enabled", "true");
        return true;
    }
}

function validData() {
    isairlineValid = validdateDropDowns('#ddlair', '#msgair', 'AirLine');
    isrouteValid = validdateDropDowns('#ddlroute', '#msgroute', 'Route');
    isdeparturetimeValid = validdate('#Date', '#date', 'Departure Date');
    isdeparturedateValid = validdate('#DepartureTime', '#msgdep', 'Departure Time');
    isarrivaltimeValid = validdate('#Time', '#msgtime', 'Arrival Time');
    isstatusValid = validdateDropDowns('#Status', '#msgStatus', 'Status');;

}

var BaseUrl = "https://localhost:44371/Schedule/";

$(document).ready(function () {
    debugger;
    LoadRoute();
    LoadAirLine();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnfieldschedule').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    validData();
    if (isairlineValid == true && isrouteValid == true && isdeparturetimeValid == true && isdeparturedateValid == true && isarrivaltimeValid == true && isstatusValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("FlightScheduleID", 0);
        formdata.append("AirLineId", $("#ddlair option:selected").val());
        formdata.append("RouteId", $("#ddlroute option:selected").val());
        formdata.append("DepartureDate", $("#Date").val());
        formdata.append("DepartureTime", $("#DepartureTime").val());
        formdata.append("ArrivalTime", $("#Time").val());
        formdata.append("Status", $("#Status option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddSchedule/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                LoadData();
                ClearTextBoxes();
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 2000,
                    message: 'Successfully Addedd',
                });

            },
            error: function (data) {
                debugger;
                iziToast.error({
                    title: 'Error',
                    position: 'center',
                    message: 'Illegal operation',
                });
            }
        });
    }
}

function LoadAirLine() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirLine/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="AirLineId" class="form-control">';
            html += '<option value="-1">--- Select AirLine ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].AirlineID + '">' + data[i].Name + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgair"></span>';
            $('#ddlair').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadRoute() {

    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Route/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="RouteId" class="form-control">';
            html += '<option value="-1">--- Select Route ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyRoute.RouteID + '">' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ')-- To --' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ') </option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgroute"></span>';
            $('#ddlroute').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function LoadData() {
    debugger;
    $.ajax({
        type: 'GET',
        url: BaseUrl + 'GetData/',
        success: function (data) {
            debugger;
            CreateTableRow(data);
           // $('#mytable').html(response);

        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function CreateTableRow(data) {
    debugger;
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var status = '';
        if (data[i].MySchedule.Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td>';
        html += '<td>' + data[i].MyAirLine.Name + '</td>';
        html += '<td>' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ')-- To --' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ') </td>';
        html += '<td>' + data[i].MySchedule.DepartureDate + '</td>';
        html += '<td>' + data[i].MySchedule.DepartureTime + '</td>';
        html += '<td>' + data[i].MySchedule.ArrivalTime + '</td>';
        html += '<td>' + data[i].Airportto.AirportName + '</td>';
        html += '<td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MySchedule.FlightScheduleID + ')"><i>Edit</i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?SID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnfieldschedule').val(data.FlightScheduleID);
            $('#ddlair').val(data.AirlineId);
            $('#ddlroute').val(data.RouteId);
            $('#Date').val(data.DepartureDate);
            $('#DepartureTime').val(data.DepartureTime);
            $('#Time').val(data.ArrivalTime);
            $('#Status').val(data.Status);
            $('#Modal').modal();
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function Update() {
    debugger;
    var formdata = new FormData();
    debugger;
    formdata.append("FlightScheduleID", $('#hdnfieldschedule').val());
    formdata.append("AirLineId", $("#ddlair option:selected").val());
    formdata.append("RouteId", $("#ddlroute option:selected").val());
    formdata.append("DepartureDate", $("#Date").val());
    formdata.append("DepartureTime", $("#DepartureTime").val());
    formdata.append("ArrivalTime", $("#Time").val());
    formdata.append("Status", $("#Status option:selected").val());
    $.ajax({
        type: 'POST',
        url: BaseUrl + "AddSchedule/",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            debugger;
            LoadData();
            ClearTextBoxes();
            iziToast.success({
                title: 'OK',
                position: 'center',
                timeout: 2000,
                message: 'Successfully Updated',
            });

        },
        error: function (data) {
            debugger;
            iziToast.error({
                title: 'Error',
                position: 'center',
                message: 'Illegal operation',
            });
        }
    });
}

function ClearTextBoxes() {
    $('#CityId').val("");
    $('#Name').val("");
    $('#CountryId').val(-1);
    $('#ProvinceId').val(-1);
    $('#Status').val(-1);
}

//function Searchflights() {
//    debugger;
//    var txt1 = $("#ddlcf option:selected").val();
//    var txt2 = $("#ddlct option:selected").val();
//    var txt3 = $("#ddlaf option:selected").val();
//    var txt4 = $("#ddlato option:selected").val();
//    /*validData();*/
//    //if (iscountryfromValid == true && iscountrytoValid == true && iscityfromValid == true && iscitytoValid == true && isairportfromValid == true && isairporttoValid == true && isstatusValid == true) {
//        debugger;
//        var formdata = new FormData();
//     //   formdata.append("RouteID", 0);
//        formdata.append("CountryFrom", $("#ddlcountry option:selected").val());
//        formdata.append("CountryTo", $("#ddlcountryto option:selected").val());
//        formdata.append("CityFrom", $("#ddlcf option:selected").val());
//        formdata.append("CityTo", $("#ddlct option:selected").val());
//        formdata.append("AirportFrom", $("#ddlaf option:selected").val());
//        formdata.append("AirportTo", $("#ddlato option:selected").val());
//       // formdata.append("Status", $("#Status option:selected").val());
//        $.ajax({
//            type: 'POST',
//            url: BaseUrl + "Searchflights/",
//            data: formdata,
//            contentType: false,
//            processData: false,
//            success: function (data) {
//                debugger;

//            },
//            error: function (data) {

//            }
//        });
//    //}
//}