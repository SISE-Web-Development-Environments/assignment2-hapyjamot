var daySelected;
var monthSelected;
var yearSelected;
var canSubmit = false;

$(document).ready( function() {
    $.validator.addMethod('strongPassword', function(value, element){
        return this.optional(element)
        || /\d/.test(value)
        && /[a-z]/i.test(value);
    }, 'Your password should contain at least one number and one character')
    $.validator.addMethod('existUsername', function(value, element){
        return this.optional(element)
        || !localStorage.getItem(value);
    }, 'Please choose a different username')
    $('#registrationForm').validate({
        rules: {
            username: {
                required: true,
                alphanumeric: true,
                existUsername: true
            },
            password: {
                required: true,
                minlength: 6,
                alphanumeric: true,
                strongPassword: true
            },
            fullName: {
                required: true,
                letterswithbasicpunc: true
            },
            email: {
                required: true,
                email: true
            },
            days: {
                required: true,
                number: true
            },
            months: {
                required: true,
                number: true
            },
            years: {
                required: true,
                number: true
            },
        },
        messages: {
            username: {
                required: "Please enter a username",
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            fullName:  {
                required: "Please enter your full name",
            },
            email: {
                required: "Please provide your email",
            } 
        },
        submitHandler: function() {
            saveToLocalStorage();
            window.alert("You have registered successfully");
            // move to login screen 
        }
    });

    $("select.days").change(function(){
        daySelected = $(this).children("option:selected").val();
    });
    $("select.months").change(function(){ 
        monthSelected = $(this).children("option:selected").val();
    });
    $("select.years").change(function(){ 
        yearSelected = $(this).children("option:selected").val();
    });
    initDays();
    initMonths();
    initYears();

});
function createOption (value, label){
    var option = document.createElement("option");
            option.value = value;
            option.text = label;
    return option;
}
function initSelect(startValue, endValue, selector, nullState){
    var selectList = $(selector)[0];
    selectList.appendChild(createOption(nullState,nullState));
    if (startValue < endValue) {
        for (var i = startValue; i <= endValue; i++) {
            selectList.appendChild(createOption(i,i));
        }
    }
    else {
        for (var i = startValue; i >= endValue; i--) {
            selectList.appendChild(createOption(i,i));
        }
    }
}

function initDays(){
    initSelect(1,31,'select.days', '- Day')
}

function initMonths(){
    initSelect(1,12,'select.months', '- Month');
}

function initYears(){
    const atLeastTen = new Date().getFullYear() - +10;
    initSelect(atLeastTen,1930,'select.years', '- Year');
}

function saveToLocalStorage() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;

    const dateOfBirth = {
        day: daySelected,
        month: monthSelected,
        year: yearSelected
    };
    const details = JSON.stringify({
        password,
        fullName,
        email,
        dateOfBirth
    });
    
    localStorage.setItem(username, details);
}