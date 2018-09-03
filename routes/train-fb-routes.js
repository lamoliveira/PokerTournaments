// Initialize Firebase
var firebase = require('firebase');
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

// Routes
// =============================================================
module.exports = function (app) {
    // post route for train 
    app.post("/api/newtrain", function (req, res) {
        console.log("api/newtrain");
        console.log(req.body.name);
        var newtrain = {
            name: req.body.name,
            destination: req.body.destination,
            firsttraintime: req.body.firsttraintime,
            frequency: req.body.frequency
        };

        trainsRef.push(newtrain);
    });
    // post route for train 
    app.post("/api/deltrain", function (req, res) {
        console.log("api/deltrain");
        console.log(req.body.name);
        var name = req.body.name;
        var ref = trainsRef.orderByKey();

        ref.once("value").then(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var childname = childSnapshot.val().name; // match train name 
                console.log("name search:" + name);
                console.log("child: " + childname);
                if (name === childname) { // train name match database value
                    childSnapshot.ref.remove(); // remove object
                }
            });
        });
    });
    app.get("/api/trains", function (req, res) {
        var newtrain =[];
        console.log("api/trains");
        // Firebase watcher + initial loader HINT: .on("value")
        trainsRef.on("child_added", function (snapshot) {

            // Log everything that's coming out of snapshot
            //console.log(snapshot.val());
            //console.log(snapshot.val().name);
            //console.log(snapshot.val().destination);
            //console.log(snapshot.val().firsttraintime);
            //console.log(snapshot.val().frequency);
            //console.log(snapshot.val().dateadded);

            // Get the to-do "value" from the textbox and store it a variable
            name = snapshot.val().name;
            destination = snapshot.val().destination;
            firsttraintime = snapshot.val().firsttraintime;
            frequency = snapshot.val().frequency;

         //   var traintimeconverted = moment(firsttraintime, "hh:mm").subtract(1, "years");
         //   var difftime = moment().diff(moment(traintimeconverted), "minutes");
         //   var timerounded = difftime % frequency;
         //   var minutesaway = frequency - timerounded;
         //   var nextarrival = moment().add(minutesaway, "minutes").format("hh:mm");

            // Create a new variable that will hold a "<th>" tag.
          //  var train = $("#train");
           // var newrow = $("<tr>");
            //            newrow.append("<td>" + name + "</td>"  + "<td>" + destination + "</td>" + "<td>" + firsttraintime + "</td>" + "<td>" + frequency + "</tr>") ;
           // newrow.append("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + nextarrival + "</td>" + "<td>" + minutesaway + "</tr>");
           // train.append(newrow);
            var ntrain = {
                name: name,
                destination: destination,
                firsttraintime: firsttraintime,
                frequency: frequency
            };
            newtrain.push(ntrain);
            //newrow.append("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + nextarrival + "</td>" + "<td>" + minutesaway + "</tr>");
            
            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
        console.log("arraytrains");
        console.log(newtrain);
        res.json(newtrain);

    });
}