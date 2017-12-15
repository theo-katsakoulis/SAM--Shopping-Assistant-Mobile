/* global CryptoJS*/

var passPhrase = "SecretPassPhraseForA2";
var salt = CryptoJS.lib.WordArray.random(128/8);
var key = CryptoJS.PBKDF2(passPhrase, salt, { keySize: 256/32 });;
var iv  = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);;

function encryptPassword(){
    var passID = document.getElementById("password");
    var pass = passID.value;
    var encrypted = CryptoJS.AES.encrypt(pass, passPhrase);
    passID.value = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function decryptPassword(encrypted){
    var decrypted = CryptoJS.AES.decrypt(encrypted, passPhrase);
    document.getElementById("password").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
}
