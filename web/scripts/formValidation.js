/* global CryptoJS */

function validateForm(){
    var isValid = true;
    
    //check name
    if(document.getElementById("fname").value.length < 2 ||
       document.getElementById("fname").value.length > 20){
        isValid = false;
        document.getElementById("invalidName").style.visibility = "visible";
    }
    
    //check last name
    if(document.getElementById("lname").value.length < 2 ||
       document.getElementById("lname").value.length > 20){
        isValid = false;
        document.getElementById("invalidLastName").style.visibility = "visible";
    }
    
    //check email
    var email = document.getElementById("email").value;
    var freq = {};
    for (var i=0; i<email.length;i++) {
        var character = email.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }
    
    if(freq['@'] && freq['.']){
        if(freq['@']!==1 || !freq['.']){
            isValid = false;
            document.getElementById("invalidEmail").style.visibility = "visible";
        }
    }else{
        isValid = false;
    }
    
    //check username
    if(document.getElementById("username").value.length < 8){
        isValid = false;
        document.getElementById("invalidUsername").style.visibility = "visible";
    }
    
    //check password
    var pass = document.getElementById("password");
    var confPass = document.getElementById("confirmPassword");
    if(pass.value !== confPass.value){
        isValid = false;
        confPass.style.borderColor = "red";
        document.getElementById("invalidMessage").style.visibility = "visible";
        document.getElementById("invalidPassInfo").innerHTML = "Οι κωδικοί που εισάγατε δεν ταιριάζουν!";
        document.getElementById("invalidPassInfo").style.visibility = "visible";
        confPass.focus();
    }else{
        if(pass.value){
            //encryptPassword();
        }
    }
    
    //check birthdate
    var birthdateYear = document.getElementById("birthdate").valueAsDate.getFullYear();
    var currDate = new Date();
    var currYear = currDate.getFullYear();
    
    if((currYear-birthdateYear<15)||(currYear-birthdateYear>100)||(currYear<birthdateYear)){
        document.getElementById("invalidDate").style.visibility = "visible";
        document.getElementById("invalidDateInfo").innerHTML = "Μη έγκυρη ημερομηνία!";
        document.getElementById("invalidDateInfo").style.visibility = "visible";
        isValid = false;
    }
     
    //check city
    if(document.getElementById("city").value.length < 2 ||
       document.getElementById("city").value.length > 20){
        isValid = false;
        document.getElementById("invalidCity").style.visibility = "visible";
    }
    
    //check telephone
    if(!isNaN(document.getElementsByName("userTelMobile").value)){
        isValid = false;
        document.getElementsByName("userTelMobile").style.borderColor = "red";
    }
    if(!isNaN(document.getElementsByName("userTelHome").value)){
        isValid = false;
        document.getElementsByName("userTelHome").style.borderColor = "red";
    }
    
    //check job
    if(document.getElementById("job").value.length > 50){
        isValid = false;
        document.getElementById("invalidJob").style.visibility = "visible";
    }
    
    return isValid;
}

var passPhrase = "SecretPassPhraseForA2";
var salt = CryptoJS.lib.WordArray.random(128/8);
var key = CryptoJS.PBKDF2(passPhrase, salt, { keySize: 256/32 });
var iv  = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

function encryptPassword(){
    var passID = document.getElementById("password");
    var pass = passID.value;
    var encrypted = CryptoJS.AES.encrypt(pass, passPhrase);
    passID.value = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function decryptPassword(){
    var decrypted = CryptoJS.AES.decrypt(document.getElementById("password").value, passPhrase);
    document.getElementById("password").value = decrypted.toString(CryptoJS.enc.Utf8);
}
