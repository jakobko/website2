var adj_iw = "";
var iw = "";
var second_adj_iw = "";
var antonym_adj_iw = "";
var similarmeaning_iw = "";
var adj_similar_iw = "";
var imgLink = "";

// adj + adj + iw + , + ant + adj_similar + similar_iw
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

// 1. steg
function api_adj_iw(input) {
  var request = createCORSRequest("get", "https://api.datamuse.com/words?rel_jjb="+input);
  if (request){
      request.onload = function(){
          var data = JSON.parse(request.responseText);
          if (data[0] == null) {
            alert("Error 01: Cannot find any data on word.")
          }
          else {
            adj_iw = "";
            adj_iw = data[0].word;
            second_adj_iw = "";
            second_adj_iw = data[1].word;
            console.log("adj_iv: " + adj_iw);
            console.log("second_adj_iw: " + second_adj_iw);

            // 2. steg start
            api_ant();
          }
      };
      request.send();
  }
}

// 2. steg
function api_ant() {
  var request = createCORSRequest("get", "https://api.datamuse.com/words?rel_ant="+adj_iw);
  if (request){
      request.onload = function(){
          var data = JSON.parse(request.responseText);
          if (data[0] == null) {
            alert("Error 02: Cannot find any data on word.")
          }
          else {
            antonym_adj_iw = "";
            antonym_adj_iw = data[0].word;
            console.log("antonym_adj_iw: " + antonym_adj_iw);

            // 3. steg start
            api_similarmeaning();
          }
      };
      request.send();
  }
}

// 3. steg
// Here I have to find a word with a similar meaning to IW before I find an adjective.
function api_similarmeaning() {
  var request = createCORSRequest("get", "https://api.datamuse.com/words?&rel_rhy="+iw);
  if (request){
      request.onload = function(){
          var data = JSON.parse(request.responseText);
          if (data[0] == null) {
            alert("Error 03: Cannot find any data on word.")
          }
          else {
            similarmeaning_iw = "";
            similarmeaning_iw = data[0].word;
            console.log("similarmeaning_iw: " + similarmeaning_iw);

            // 4. steg start
            api_adj_similar_iw();
          }
      };
      request.send();
  }
}

// 4. steg
// Here I'll find an adjective that describes the new similarword.
function api_adj_similar_iw() {
  var request = createCORSRequest("get", "https://api.datamuse.com/words?rel_jjb="+similarmeaning_iw);
  if (request){
      request.onload = function(){
          var data = JSON.parse(request.responseText);
          if (data[0] == null) {
            alert("Error 04: Cannot find any data on word.")
          }
          else {
            adj_similar_iw = "";
            adj_similar_iw = data[0].word;
            console.log("adj_similar_iw: " + adj_similar_iw);

            // 5. stega start
            putTogetherSlogan();
          }
      };
      request.send();
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 5. steg
// Puts together all the diferent words found and prints them to screen.
function putTogetherSlogan() {
  var textarea = document.getElementById("textresult");
  var textresult = document.createTextNode(capitalizeFirstLetter(adj_iw) + " " + second_adj_iw + " " + iw + ", " + antonym_adj_iw + " " + adj_similar_iw + " " + similarmeaning_iw + "!");
  textarea.appendChild(textresult);
  findImage();
}

// Bildefinner
function findImage() {
  var request = createCORSRequest("get", "https://www.googleapis.com/customsearch/v1?key=AIzaSyA_30lBz5GnLq0G-A7FMlRLpYOOtMOl4VY&cx=002111179104835699975:3wwe6vpp61k&q="+adj_iw+"+"+iw+"&searchType=image");
  if (request){
      request.onload = function(){
        var data = JSON.parse(request.responseText);
        imgLink = "";
        imgLink = data.items[0].link;
        console.log(imgLink);
        document.getElementById("imageresult").src = imgLink;
      };
      request.send();
  }
}

function buttonEvent() {
  var input = document.getElementById("inputbox").value;
  var textarea = document.getElementById("textresult");

  document.getElementById("inputbox").value = "";
  document.getElementById("inputbox").placeholder = "Write a word here..";

  if (input.trim().indexOf(' ') != -1) {
    alert("Please use only one word");
  }
  else {
    while (textarea.firstChild) {
      textarea.removeChild(textarea.firstChild);
    }

    // 1. steg start
    iw = input;
    api_adj_iw(input);
  }
}

//siste steg, gjør dette
//var textarea = document.getElementById("textresult");
//var textresult = document.createTextNode(firstword + " " + textinput);
//textarea.appendChild(textresult);



//function removeText() {
//  document.getElementsByName("textinput").value = "";
//}
