// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAGdzf8_fL2E9spT__bQFY4xG5d0_vJ5iU",
//   authDomain: "random-48d18.firebaseapp.com",
//   databaseURL: "https://random-48d18.firebaseio.com",
//   projectId: "random-48d18",
//   storageBucket: "random-48d18.appspot.com",
//   messagingSenderId: "837643100359"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

// // 2. Button for adding Employees
// $("#add-employee-btn").on("click", function(event) {
//   event.preventDefault();

//   // Grabs user input
//   var empName = $("#employee-name-input").val().trim();
//   var empRole = $("#role-input").val().trim();
//   var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
//   var empRate = $("#rate-input").val().trim();

//   // Creates local "temporary" object for holding employee data
//   var newEmp = {
//     name: empName,
//     role: empRole,
//     start: empStart,
//     rate: empRate
//   };

//   // Uploads employee data to the database
//   database.ref().push(newEmp);

//   // Logs everything to console
//   console.log(newEmp.name);
//   console.log(newEmp.role);
//   console.log(newEmp.start);
//   console.log(newEmp.rate);

//   alert("Employee successfully added");

//   // Clears all of the text-boxes
//   $("#employee-name-input").val("");
//   $("#role-input").val("");
//   $("#start-input").val("");
//   $("#rate-input").val("");
// });

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var empName = childSnapshot.val().name;
//   var empRole = childSnapshot.val().role;
//   var empStart = childSnapshot.val().start;
//   var empRate = childSnapshot.val().rate;

//   // Employee Info
//   console.log(empName);
//   console.log(empRole);
//   console.log(empStart);
//   console.log(empRate);

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate



//   // Create the new row
//   var newRow = $("<tr>").append(
//     $("<td>").text(empName),
//     $("<td>").text(empRole),
//     $("<td>").text(empRate),
//   );

//   // Append the new row to the table
//   $("#employee-table > tbody").append(newRow);
// });

// // Example Time Math
// // -----------------------------------------------------------------------------
// // Assume Employee start date of January 1, 2015
// // Assume current date is March 1, 2016

// // We know that this is 15 months.
// // Now we will create code in moment.js to confirm that any attempt we use meets this test case
$( document ).ready(function() {
  // initialize firebase
  var config = {
    apiKey: "AIzaSyAGdzf8_fL2E9spT__bQFY4xG5d0_vJ5iU",
    authDomain: "random-48d18.firebaseapp.com",
    databaseURL: "https://random-48d18.firebaseio.com",
    projectId: "random-48d18",
    storageBucket: "random-48d18.appspot.com",
    messagingSenderId: "837643100359"
  };
  firebase.initializeApp(config);

  // a var to represent the database
   var database = firebase.database();

  // button to submit the user given info
  $("#trainInfoBtn").on("click", function(event) {
    event.preventDefault(); //no button reset

    //set user input values to variables
    var trainName = $("#name").val().trim();
    var destination = $("#dest").val().trim();

    //converts user input to usable info
    var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");

    var frequency = $("#freq").val().trim();

    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTime);
    // console.log(frequency);
    // console.log(currentTime);



    //gathers together all our new train info
    var newTrain = {

      train: trainName,
      trainGoing: destination,
      trainComing: firstTime,
      everyXMin: frequency
    };


    //uploads newTrain to firebase
    database.ref().push(newTrain);
    //*push* adds to info already in firebase. *set* overwrites preexisting info

    //clears elements before adding new text
    $("#name").val("");
    $("#dest").val("");
    $("#firstTime").val("");
    $("#freq").val("");

    //supposed to prevent from moving to a new page... idk how
    return false;

  }); //end of onclick

  //figure out what this does
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());
      //store in variables
      var trainName = childSnapshot.val().train;
      var destination =childSnapshot.val().trainGoing;
      var firstTime = childSnapshot.val().trainComing;
      var frequency = childSnapshot.val().everyXMin;

  // 		console.log(trainName);
  // 		console.log(destination);
  // 		console.log(firstTime);
  // 		console.log(frequency);

      //makes first train time neater
      var trainTime = moment.unix(firstTime).format("hh:mm");
      //calculate difference between times
      var difference =  moment().diff(moment(trainTime),"minutes");

      //time apart(remainder)
      var trainRemain = difference % frequency;

      //minutes until arrival
      var minUntil = frequency - trainRemain;

      //next arrival time
      var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

      //adding info to DOM table
      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

  });
  });
