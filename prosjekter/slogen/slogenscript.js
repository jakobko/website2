var firstword = "";

function apiHandler(textinput) {
  $.getJSON("http://api.datamuse.com/words?rel_jjb="+textinput)

  .done(function(data) {
    var firstword = data[0].word;
    console.log(firstword);
    var textarea = document.getElementById("textresult");
    var textresult = document.createTextNode(firstword + " " + textinput);
    textarea.appendChild(textresult);
  })
  .fail(function(data){
    alert("Can't find any data on word.");
  });
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

    apiHandler(input);


  }
}

function removeText() {
  document.getElementsByName("textinput").value = "";
}
