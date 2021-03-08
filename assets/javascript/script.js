// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");

  //Length prompt lets you type in the # of characters 8 <= x <= 128
  var lengthInput = window.prompt("How many characters would you like your password to have?\nLength number must be between 7 and 129", "");
    if (lengthInput < 8 || lengthInput > 128) {
        window.confirm ("Password length must be between 7 and 129.");
        return;
    }
  //Converts lenghtInput to a number
    var lengthNumber = parseFloat(lengthInput);
    

  //Type prompts let you choose lowercase, uppercase, numeric, and/or special characters
  var hasSpecial = window.confirm("Click OK to confirm including special characters.");
  var hasNumeric = window.confirm("Click OK to confirm including numeric characters.");
  var hasUpper = window.confirm("Click OK to confirm including uppercase letters.");
  var hasLower = window.confirm("Click OK to confirm including lowercase letters.");

  //Object that provides characters from the getRandom functions for each type
  var randomizationFunc = {
	  symbol: getRandomSymbol,
    number: getRandomNumber,
    upper: getRandomUpper,
    lower: getRandomLower,
  }

  var password = generatePassword(hasSpecial, hasNumeric, hasUpper, hasLower, lengthNumber);

  //Password needs to be generated
  function generatePassword(symbol, number, upper, lower, lengthNumber) {
      var generatedPassword = '';
      var characterTypesIncluded = symbol + number + upper + lower;
      var typesArr = [{symbol}, {number}, {upper}, {lower}].filter(item => Object.values(item)[0]);

    //If no type is selected
      if(characterTypesIncluded === 0) {
      return '';
    }

    //loop over the length and call the getRandom function for each type
      for(var i = 0; i < lengthNumber; i += characterTypesIncluded) {
          typesArr.forEach(function (type) {
              var funcName = Object.keys(type)[0];
              generatedPassword += randomizationFunc[funcName]();
          });
      }
      var finalPassword = generatedPassword.slice(0, lengthNumber);
      return finalPassword;
  }

  passwordText.textContent = password;

}

//Functions that generate random characters
function getRandomLower() {
	var lowers = 'abcdefghijklmnopqrstuvwxyz'
	return lowers[Math.floor(Math.random() * lowers.length)];
}

function getRandomUpper() {
	var uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return uppers[Math.floor(Math.random() * uppers.length)];
}

function getRandomNumber() {
	var numbers = '0123456789'
	return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomSymbol() {
	var symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


