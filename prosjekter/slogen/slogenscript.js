var adj_iw = "";
var iw = "";
var second_adj_iw = "";
var antonym_adj_iw = "";
var similarmeaning_iw = "";
var adj_similar_iw = "";

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

function api_adj_iw(input) {
  var request = createCORSRequest("get", "https://api.datamuse.com/words?rel_jjb="+input);
  if (request){
      request.onload = function(){
          //do something with request.responseText
          var data = JSON.parse(request.responseText);
          console.log(data[0].word);
      };
      request.send();
  }
}

function api_adj_iw(input) {
  var request = createCORSRequest("get", "https://api.datamuse.com/words?rel_jjb="+input);
  if (request){
      request.onload = function(){
          //do something with request.responseText
          var data = JSON.parse(request.responseText);
          adj_iw = "";
          adj_iw = data[0].word;
          second_adj_iw = "";
          second_adj_iw = data[1].word;
          console.log("adj_iv: " + adj_iw);
          console.log("second_adj_iw: " + second_adj_iw);
      };
      request.send();
  }
}


/*
// 1. steg
function api_adj_iw(textinput) {
  $.getJSON("https://api.datamuse.com/words?rel_jjb="+textinput)
  .done(function(data) {
    adj_iw = "";
    adj_iw = data[0].word;
    second_adj_iw = "";
    second_adj_iw = data[1].word;
    console.log("adj_iv: " + adj_iw);
    console.log("second_adj_iw: " + second_adj_iw);

    // 2. steg start
    api_ant();
  })
  .fail(function(data){
    alert("Can't find any data on word.");
  });
}

// 2. steg
function api_ant() {
  $.getJSON("https://api.datamuse.com/words?rel_ant="+adj_iw)
  .done(function(data) {
    antonym_adj_iw = "";
    antonym_adj_iw = data[0].word;
    console.log("antonym_adj_iw: " + antonym_adj_iw);
    //api_wordsfollow_iw();
  })
  .fail(function(data){
    alert("Can't find any data on word.");
  });
}
*/

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
