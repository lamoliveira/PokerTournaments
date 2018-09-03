// Initialize Firebase
//var admin = require('firebase-admin');

// Initialize Firebase
/*var firebase = require('firebase');
//var app = firebase.initializeApp({ ... });
var config = {
    apiKey: "AIzaSyBSHPT5Ec9qPtb0bpk4H6tu82r3Cv0h_lc",
    authDomain: "teste-80f90.firebaseapp.com",
    databaseURL: "https://teste-80f90.firebaseio.com",
    projectId: "teste-80f90",
    storageBucket: "teste-80f90.appspot.com",
    messagingSenderId: "520015397491"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var trainsRef = database.ref('trains');
*/
// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();
    console.log("addtrainclicked");
    // Don't refresh the page!
    //event.preventDefault();
    name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firsttraintime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    var newtrain = {
        name: name,
        destination: destination,
        firsttraintime: firsttraintime,
        frequency: frequency
    };

    $.post("/api/newtrain", newtrain, function () {
        window.location.href = "/train";
    });
    //trainsRef.push(newtrain);
    /*
    name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firsttraintime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim(); 
    
    trainsRef.push({
        name: name,
        destination: destination,
        firsttraintime: firsttraintime,
        frequency: frequency
        //,        dateadded: firebase.database.ServerValue.TIMESTAMP
    });*/
    //alert("Train has been added. (This schedule refreshes every 60 secs)");
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

$("#del-train").on("click", function (event) {
    name = $("#train-name-input").val().trim();
    var deltrain = {
        name: name
    };

    $.post("/api/deltrain", deltrain, function () {
        window.location.href = "/train";
    });
});
$.get("/api/trains", renderTrains);

function renderTrains(snapshot) {
    console.log("gettrains");
    // Firebase watcher + initial loader HINT: .on("value")
    //trainsRef.on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    //    console.log(snapshot.val());
    //    console.log(snapshot.val().name);
    //    console.log(snapshot.val().destination);
    //    console.log(snapshot.val().firsttraintime);
    //    console.log(snapshot.val().frequency);
    //console.log(snapshot.val().dateadded);

    // Get the to-do "value" from the textbox and store it a variable
    console.log(snapshot);
    for (i = 0; i < snapshot.length; i++) {
        name = snapshot[i].name;
        destination = snapshot[i].destination;
        firsttraintime = snapshot[i].firsttraintime;
        frequency = snapshot[i].frequency;

        var traintimeconverted = moment(firsttraintime, "hh:mm").subtract(1, "years");
        var difftime = moment().diff(moment(traintimeconverted), "minutes");
        var timerounded = difftime % frequency;
        var minutesaway = frequency - timerounded;
        var nextarrival = moment().add(minutesaway, "minutes").format("hh:mm");

        // Create a new variable that will hold a "<th>" tag.
        var train = $("#train");
        var newrow = $("<tr>");
        //            newrow.append("<td>" + name + "</td>"  + "<td>" + destination + "</td>" + "<td>" + firsttraintime + "</td>" + "<td>" + frequency + "</tr>") ;
        newrow.append("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + nextarrival + "</td>" + "<td>" + minutesaway + "</tr>");
        train.append(newrow);
    }

};