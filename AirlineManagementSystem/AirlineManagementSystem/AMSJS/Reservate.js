var fname = false;
var lname = false;
var cnic = false;
var email = false;
var phone = false;
var passport = false;
var nationality = false;
var cabin = false;
var fschedule = false;
var rescode = false;
var seat = false;
var pasword = false;
var status = false;

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

function validData() {
    fname = validdate('#firstName', '#msgName', 'First Name ');
    lname = validdate('#lastName', '#msgLName', 'Last Name ');
    cnic = validdate('#cNIC', '#msgcnic', 'CNIC');
    email = validdate('#email', '#msgemail', 'Email ');
    phone = validdate('#phoneno', '#phone', 'Phone No');
    passport = validdate('#passportNo', '#msgpassport', 'Passport No');
    nationality = validdate('#nationality', '#msgnationality', 'Nationality');
    cabin = validdateDropDowns('#cabinID', '#msgcabin', 'Cabin');
    fschedule = validdateDropDowns('#flightScheduleId', '#msgfschedule', 'Flight Schedule');
    rescode = validdate('#reservationCode', '#msgrescode', 'Reservation Code');
    seat = validdate('#seatNo', '#msgseat', 'Seat');
    pasword = validdate('#password', '#msgpassword', 'Password');
    status = validdateDropDowns('#status', '#msgstatus', 'Status');
}

var BaseUrl = "https://localhost:44371/Reservation/";

$(document).ready(function () {
    debugger;
    LoadCabin();
    LoadSchedule();
    // LoadData();
});

//function SubmitData() {
//    debugger;
//    if ($('#hdnfieldres').val() != "") {
//       // Update();
//    }
//    else {
//        Add();
//    }
//}

function Add() {
    debugger;
    //validData();
    //if (fname == true && lname == true && cnic == true && email == true && phone == true && passport == true && nationality == true && cabin == true && fschedule == true && rescode == true && seat == true && pasword == true && status == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("ReservationID", 0);
        formdata.append("FirstName", $("#firstName").val());
        formdata.append("Lastname", $("#lastName").val());
        formdata.append("CNIC", $("#cNIC").val());
        formdata.append("Email", $("#email").val());
        formdata.append("Phoneno", $("#phoneno").val());
        formdata.append("PassportNo", $("#passportNo").val());
        formdata.append("Nationality", $("#nationality").val());
        formdata.append("CabinID", $("#cabinID option:selected").val());
        formdata.append("FlightScheduleId", $("#flightScheduleId option:selected").val());
        formdata.append("ReservationCode", $("#reservationCode").val());
        formdata.append("SeatNo", $("#seatNo").val());
        formdata.append("Password", $("#password").val());
        formdata.append("Status", $("#status option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "BookingDetail/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 3000,
                    message: 'Your Booking has been created Successfully',
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
  //  }
}

function LoadCabin() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Cabin/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CabinID" class="form-control">';
            html += '<option value="-1">--- Select Cabin ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CabinId + '">' + data[i].Name + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcabin"></span>';
            $('#cabinID').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadSchedule() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Schedule/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="FlightScheduleId" class="form-control">';
            html += '<option value="-1">--- Select Flight Schdule ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MySchedule.FlightScheduleID + '">' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ')-- To --' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ') </option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgfschedule"></span>';
            $('#flightScheduleId').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}
