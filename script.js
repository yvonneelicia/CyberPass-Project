//declaring variables
const valueLength = document.querySelector(".pass-length input"), // const defines the variable as unchangeable and document.querySelector() searches and returns first element within the document.
passwordSettings = document.querySelectorAll(".opt input"), //variable declaration
copyIcon = document.querySelector(".pass-box span"), //variable declaration
passwordInput = document.querySelector(".pass-box input"), //variable declaration
passwordIndicator = document.querySelector(".pass-indicator"), //variable declaration 
generateButton = document.querySelector(".generate-button"); //variable declaration

const characters = { 
    lowercase: "abcdefghijklmnopqrstuvwxyz", //By default, starting with the letters of the English alphabet in lowercase.
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // defined uppercase characters
    numbers: "0123456789", // defined a list of digits
    symbols: "^!$%&|[](){}:;.,*+-#@<>~" // defined a list of random symbols to make these available
}


//Based on list of characters, a password needs to be generated, a final version of the string
const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = valueLength.value; //enables user to select the value of password using slider function

    passwordSettings.forEach(passwordSettings => { // this piece of code allows looping through each password option's checkbox
        if(passwordSettings.checked) { // if checkbox is checked
            // if checkbox id isn't exc-duplicate && spaces
            if(passwordSettings.id !== "exc-duplicate" && passwordSettings.id !== "inc-spaces") {
                // adding particular key value from character object to staticPassword
                staticPassword += characters[passwordSettings.id];
            } else if(passwordSettings.id === "inc-spaces") { // if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `; // adding space at the beginning & end of staticPassword
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) { // This piece of code is generating a random number(password) then we are using Math.floor to convert into the whole number according to length inputted by the user.
        // getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // if excludeDuplicate is true
            // if randomPassword doesn't contain the current random character or randomChar is equal 
            // to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; // this piece of code passes randomPassword to passwordInput value
}


const upadatePasswordIndicator = () => {
    // This piece of code instructs that if valueLength value 8 then pass "weak" as passwordIndicator id else if valueLength 
    // value is 16 or less pass "medium" as id else pass "strong" as id
    passwordIndicator.id = valueLength.value <= 8 ? "weak" : valueLength.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass-length span").innerText = valueLength.value;
    generatePassword();
    upadatePasswordIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // enables user to copy the random password. The writeText() function writes generated password string to the system clipboard
    copyIcon.innerText = "check"; // this instructs the copy icon to change to a tick icon when clicked 
    copyIcon.style.color = "#b042f4"; 
    setTimeout(() => { // after 1.5 seconds, the tick icon changes back to the copy icon 
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#a142f4"; //color of icon when timer is up
    }, 1500);
}

// addEventListener() method attaches an event handler to the specified element, functions are set up to be called when a specified event happens 
copyIcon.addEventListener("click", copyPassword); //enables user to copy generated password once they click the copy icon
valueLength.addEventListener("input", updateSlider); //enables user to input value when they update the slider to chose a value
generateButton.addEventListener("click", generatePassword); // enables user to generate a random password once they click the 'generate password' button 