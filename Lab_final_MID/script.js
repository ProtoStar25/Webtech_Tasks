const form = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const department = document.getElementById("department");
const about = document.getElementById("about");

const submitButton = document.getElementById("submitButton");
const successMessage = document.getElementById("successMessage");
const attemptInfo = document.getElementById("attemptInfo");

let passwordAttempts = 0;
const maximumPasswordAttempts = 3;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();
    successMessage.textContent = "";

    let isValid = true;

    const alphabetPattern = /^[A-Za-z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName.value.trim() === "") {
        showError(firstName, "firstNameError", "First name is required.");
        isValid = false;
    } else if (!alphabetPattern.test(firstName.value.trim())) {
        showError(firstName, "firstNameError", "First name must contain alphabets only.");
        isValid = false;
    }

    if (lastName.value.trim() === "") {
        showError(lastName, "lastNameError", "Last name is required.");
        isValid = false;
    } else if (!alphabetPattern.test(lastName.value.trim())) {
        showError(lastName, "lastNameError", "Last name must contain alphabets only.");
        isValid = false;
    }

    if (email.value.trim() === "") {
        showError(email, "emailError", "Email is required.");
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showError(email, "emailError", "Enter a valid email address.");
        isValid = false;
    }

    if (password.value.trim() === "") {
        passwordAttempts++;
        showError(password, "passwordError", "Password is required.");
        isValid = false;
        updatePasswordAttempts();
    }

    const selectedGender = document.querySelector('input[name="gender"]:checked');

    if (selectedGender === null) {
        document.getElementById("genderError").textContent = "Please select a gender.";
        isValid = false;
    }

    const selectedInterests = document.querySelectorAll('input[name="interest"]:checked');

    if (selectedInterests.length === 0) {
        document.getElementById("interestError").textContent = "Select at least one interest.";
        isValid = false;
    }

    if (department.value === "") {
        showError(department, "departmentError", "Please select a department.");
        isValid = false;
    }

    if (about.value.trim() === "") {
        showError(about, "aboutError", "About Yourself is required.");
        isValid = false;
    } else if (about.value.trim().length < 20) {
        showError(about, "aboutError", "Write at least 20 characters.");
        isValid = false;
    }

    if (isValid) {
        successMessage.textContent =
            "Registration Successful! Thank you for registering.";

        form.reset();
        passwordAttempts = 0;
        submitButton.disabled = false;
        password.disabled = false;
        attemptInfo.textContent = "Maximum password attempts: 3";
    }
});

function showError(inputElement, errorElementId, message) {
    document.getElementById(errorElementId).textContent = message;
    inputElement.classList.add("input-error");
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error");

    errorMessages.forEach(function (errorMessage) {
        errorMessage.textContent = "";
    });

    const fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {
        field.classList.remove("input-error");
    });
}

function updatePasswordAttempts() {
    const attemptsLeft = maximumPasswordAttempts - passwordAttempts;

    if (attemptsLeft > 0) {
        attemptInfo.textContent = "Password attempts left: " + attemptsLeft;
    } else {
        attemptInfo.textContent = "Maximum password attempts reached.";
        password.disabled = true;
        submitButton.disabled = true;
    }
}
