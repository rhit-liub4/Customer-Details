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
                console.log(document.getElementById("#" + errors[i]+"L"));

                let target =errors[i]+"L"
                
                let text = document.getElementById(target).innerText;


                $('#errorTextBox').append("<div>The field: " + text + " is invalid</div>");
            }
            return;
        }


        $.ajax({
            type: "POST",
            url: "http://localhost:7169/Customer",
            contentType: "application/json",
            data: JSON.stringify(formData),
            dataType: "json",
            //encode: true,
        }).done(function (data) {
            console.log(data);
        });

        
        event.stopPropagation();
    });
});