$(document).ready(function () {
    $("#userForm").submit(function (event) {
        event.preventDefault();
        $('#errorTextBox').empty();
        var formData = {
            fname: $("#fname").val(),
            lname: $("#lname").val(),
            favoriteColor: $("#favcolor").val(),
            dateOfBirth: $("#dob").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
        };

        let check = JSON.stringify(formData);
        console.log(check);

        var errors = [];

        if (!formData.fname) {
            errors.push("fname");
        }
        if (!formData.lname) {
            errors.push("lname");
        }
        if (!formData.favoriteColor) {
            errors.push("favcolor");
        }
        if (!formData.dateOfBirth) {
            errors.push("dob");
        }
        if (!formData.email) {
            errors.push("email");
        }
        if (!formData.phone) {
            errors.push("phone");
        }


        if (errors.length > 0) {
            for (i = 0; i < errors.length; i++) {
                var error = errors[i];
                $('#' + errors[i]).addClass('invalid');
                console.log(document.getElementById("#" + errors[i] + "L"));

                let target = errors[i] + "L"

                let text = document.getElementById(target).innerText;


                $('#errorTextBox').append("<div>The field: " + text + " is invalid</div>");
            }
            return;
        }


        $.ajax({
            type: "POST",
            url: "https://localhost:7169/Customer",
            contentType: "application/json",
            data: JSON.stringify(formData),
            dataType: "json",

            //encode: true,
        }).done(function (data) {
            updateScreen();
            console.log(data);
        });


        event.stopPropagation();
    });
});

function clearTable() {
    $('#myTable').empty();
}

function writeHeader() {
    var newRow = "<tr id='headerRow'><th>First Name</th><th>Last Name</th><th>Color</th><th>Date of Birth</th><th>Age</th><th>Email</th><th>Phone</th></tr>";
    $("#myTable").append(newRow);
}

function updateScreen() {
    clearTable();
    writeHeader();

    $.ajax({
        type: "GET",
        url: "https://localhost:7169/Customer",
        contentType: "application/json",
        dataType: "json",
        success: (function (data) {
            $.each(data, function (index, item) {
                var newRow = "<tr id='dataRow'><td>" +
                    item.fname + "</td><td>" +
                    item.lname + "</td><td>" +
                    "<div class='circle' style='background-color: " + item.favoriteColor + "'></div></td><td>" +
                    item.dateOfBirth + "</td><td>" +
                    item.currentAge + "</td><td>" +
                    item.email + "</td><td>" +
                    item.phone + "</td>" +
                    "<td class='remove' id='removeButton' onclick='remove(" + item.id + ")'><button>X</button></td></tr>";
                $("#myTable").append(newRow);
            });
        })
    });
}

function remove(id) {

    $.ajax({
        type: "DELETE",
        url: "https://localhost:7169/Customer/" + id,
        success: (function (data) {
            console.log("Deleted");
            updateScreen();
        }),
    });

}

updateScreen();