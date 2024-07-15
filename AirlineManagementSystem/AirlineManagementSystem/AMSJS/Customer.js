
var iscountryfromValid = false;
var iscountrytoValid = false;
var iscityfromValid = false;
var iscitytoValid = false;
var isairportfromValid = false;
var isairporttoValid = false;
var isstatusValid = false;

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

function validdateDropDowns1(txt, msg, data) {
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

//function validdateDropDownsss(txt, msg, data) {
//    debugger;
//    if ($(txt + ' option:selected').val() == "-1") {
//        var mymsg = data + ' is required';
//        $(txt).css("border-color", "red");
//        $(msg).html(mymsg);
//        $('#btnSubmit').css("Enabled", "false");
//        return false;
//    }
//    else {
//        $(txt).css("border-color", "green");
//        $(msg).html("");
//        $('#btnSubmit').css("Enabled", "true");
//        if (txt == "#ddlcountryto") {
//            var countrytoId = $(txt + ' option:selected').val();
//            LoadCityto(countrytoId);
//        }
//        return true;
//    }
//}

function validData() {
    iscountryfromValid = validdateDropDowns('#ddlcountry', '#msgcouf', 'Country From');
    iscountrytoValid = validdateDropDowns('#ddlcountryto', '#msgctt', 'Country To');
    iscityfromValid = validdateDropDowns1('#ddlcf', '#msgcf', 'City From');
    iscitytoValid = validdateDropDowns1('#ddlct', '#msgct', 'City To');
    isairportfromValid = validdateDropDowns('#ddlaf', '#msgaf', 'Airport From');
    isairporttoValid = validdateDropDowns('#ddlato', '#msgat', 'Airport To');
    isstatusValid = validdateDropDowns('#Status', '#msgstatus', 'Status');

}

var BaseUrl = "https://localhost:44371/Customer/";

$(document).ready(function () {
    debugger;
    LoadCountry();
    LoadCountryto();
    //LoadCityfrom();
    // LoadCityto();
    // LoadAirportfrom();
    //LoadAirportto();
    LoadData();
});

function LoadCountry() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CountryFrom" class="form-control">';
            html += '<option value="-1">--Select Country From--</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CountryId + '">' + data[i].CountryName + '</option>';
            }
            html += '</select>';
            html += '<span class="text-danger" id="msgcouf"></span>';
            $('#ddlcountry').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadCountryto() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CountryTo" class="form-control">';
            html += '<option value="-1">--Select Country To--</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CountryId + '">' + data[i].CountryName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgctt"></span>';
            $('#ddlcountryto').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadCityfrom(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetDataByCountryId?Id=" + id,
        dataType: 'JSON',
        success: function (data) {

            debugger;
            var html = '';
            html += '<select id="CityFrom" class="form-control">';
            html += '<option value="-1">---Select City From---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyCity.CityId + '">' + data[i].MyCity.CityName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcf"></span>';
            $('#ddlcf').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadCityto(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetDataByCountryId?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CityTo" class="form-control">';
            html += '<option value="-1">---Select City To---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyCity.CityId + '">' + data[i].MyCity.CityName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgct"></span>';
            $('#ddlct').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadAirportfrom(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirPort/GetAirportById?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="AirportFrom" class="form-control">';
            html += '<option value="-1">---Select Airport From---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyAirPort.AirportID + '">' + data[i].MyAirPort.AirportName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgaf"></span>';
            $('#ddlaf').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadAirportto(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirPort/GetAirportById?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="AirportTo" class="form-control">';
            html += '<option value="-1">---Select Airport To---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyAirPort.AirportID + '">' + data[i].MyAirPort.AirportName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgat"></span>';
            $('#ddlato').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

//function LoadData() {
//    debugger;
//    $.ajax({
//        type: 'GET',
//        url: BaseUrl + 'GetData/',
//        dataType: 'JSON',
//        success: function (data) {
//            debugger;
//            CreateTableRow(data);
//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    });

//}

