// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZmtB4TTkeHMVJU0Us4XeqcnamT6qMGCQ",
    authDomain: "train-37ba5.firebaseapp.com",
    databaseURL: "https://train-37ba5.firebaseio.com",
    projectId: "train-37ba5",
    storageBucket: "",
    messagingSenderId: "190110064120"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var time = 0;
    var frequency = "";

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      time = $("#time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      // Code for the push
      dataRef.ref().push({

        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);

      // full list of items to the well
      $("#full-member-list").append("<div class='well'><span class='member-name'> " +
        childSnapshot.val().name +
        " </span><span class='member-destination'> " + childSnapshot.val().destination +
        " </span><span class='member-time'> " + childSnapshot.val().time +
        " </span><span class='member-frequency'> " + childSnapshot.val().frequency +
        " </span></div>");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#name-display").text(snapshot.val().name);
      $("#email-display").text(snapshot.val().destination);
      $("#age-display").text(snapshot.val().time);
      $("#comment-display").text(snapshot.val().frequency);
    });