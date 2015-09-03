var workMinutes = 25;
var workSeconds = 25 * 60;
var breakMinutes = 5;
var breakSeconds = 5 * 60;
var session = false;
var sessionLength = workSeconds;
var breakLength = breakSeconds;
var breaking = false;
var working = true;

$(document).ready(function() {

  $('#timer').html(workMinutes + ":00");
  $('#timeDisplay').html(workMinutes);
  $('#breakDisplay').html(breakMinutes);

  console.log(breakSeconds)

  $('#sessionDown').click(function() {
    if (workMinutes > 1) {
      workMinutes -= 1;
      sessionLength = workMinutes;
      workSeconds = workMinutes * 60;
      $('#timeDisplay').html(workMinutes);
      if (working) {
        $('#timer').html(workMinutes + ":00");
        session = false;
        $('#timer').css("border-color", "#D9534F");
        clearInterval(timerInterval);
      }
    }
  })

  $('#sessionUp').click(function() {
    workMinutes += 1;
    sessionLength = workMinutes;
    workSeconds = workMinutes * 60;
    $('#timeDisplay').html(workMinutes);
    if (working) {
      $('#timer').html(workMinutes + ":00");
      session = false;
      $('#timer').css("border-color", "#D9534F");
      clearInterval(timerInterval);
    }
  })

  $('#breakDown').click(function() {
    if (breakMinutes > 1) {
      breakMinutes -= 1;
      breakLength = breakMinutes;
      breakSeconds = breakMinutes * 60;
      $('#breakDisplay').html(breakMinutes);
      if (breaking) {
        $('#timer').html(breakMinutes + ":00");
        session = false;
        $('#timer').css("border-color", "#D9534F");
        clearInterval(timerInterval);
      }
    }
  })

  $('#breakUp').click(function() {
    breakMinutes += 1;
    breakLength = breakMinutes;
    breakSeconds = breakMinutes * 60;
    $('#breakDisplay').html(breakMinutes);
    if (breaking) {
      $('#timer').html(breakMinutes + ":00");
      session = false;
      $('#timer').css("border-color", "#D9534F");
      clearInterval(timerInterval);
    }
  })

})

var timerInterval = 0

$('#timer').click(function() {
  if (session == false) {
    timerInterval = setInterval(function() {
      timerStart()
    }, 1000);
    session = true;
    $('#timer').css("border-color", "#5CB85C")
  } else {
    clearInterval(timerInterval);
    session = false;
    $('#timer').css("border-color", "#D9534F")
  }
});

$('#reset').click(function() {
  clearInterval(timerInterval);
  session = false;
  working = true;
  breaking = false;
  $('#timer').css("border-color", "#D9534F");
  $('#timer').css("background-color", "#333");
  $('#timer').css("color", "#FFF");

  $('#message').html("<br><br>Time to work.");
  $('#timer').text(workMinutes + ":00");
})

function workStart() {
  if (workSeconds > 0) {
    workSeconds--;
    var calcSeconds;
    var calcMinutes = Math.floor(workSeconds / 60)
    if ((workSeconds % 60).toString().length == 1) {
      calcSeconds = "0" + (workSeconds % 60)
    } else {
      calcSeconds = workSeconds % 60
    }
    $('#timer').text(calcMinutes + ":" + calcSeconds);
  } else {
    $('#timer').css("background-color", "#fff");
    $('#timer').css("color", "#333");
    breakSeconds = breakLength * 60;
    $('#timer').text(breakMinutes + ":00");
    $('#message').html("<br><br>TIME TO PARTY!!!!!!!!!!!!!!!!!");
    workSeconds--;
    working = false;
    breaking = true;
  }
}

function breakStart() {
  if (breakSeconds > 0) {
    breakSeconds--;
    var calcBreakSeconds;
    var calcBreakMinutes = Math.floor(breakSeconds / 60)
    if ((breakSeconds % 60).toString().length == 1) {
      calcBreakSeconds = "0" + (breakSeconds % 60)
    } else {
      calcBreakSeconds = breakSeconds % 60
    }
    $('#timer').text(calcBreakMinutes + ":" + calcBreakSeconds);
  } else {
    workSeconds = sessionLength * 60;
    $('#timer').css("background", "#333");
    $('#timer').css("color", "#fff");
    $('#timer').text(workMinutes + ":00");
    $('#message').html("<br><br>Time to work.");
    working = true;
    breaking = false;
  }
}

function timerStart() {
  if (working) {
    workStart();
    console.log("work time: " + workSeconds);
  } else {
    breakStart();
    console.log("break time: " + breakSeconds);
  }
}
