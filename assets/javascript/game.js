$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgG-9NRVF7H5mt9WjUa-5GcJZV-8Nj0Bw",
    authDomain: "train-schedule-6bbb2.firebaseapp.com",
    databaseURL: "https://train-schedule-6bbb2.firebaseio.com",
    projectId: "train-schedule-6bbb2",
    storageBucket: "train-schedule-6bbb2.appspot.com",
    messagingSenderId: "349607756340",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-button").on("click", function() {
    var trainName = $("#name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var firstTrain = moment(
      $("#firstTrain-input")
        .val()
        .trim(),
      "HH:mm"
    )
      .subtract(10, "years")
      .format("X");
    var frequency = $("#frequency-input")
      .val()
      .trim();

    var newTrain = {
      name: trainName,
      newDestination: destination,
      newFirstTrain: firstTrain,
      newFrequency: frequency,
    };
    database.ref().push(newTrain);

    alert("The Train Is On Its Way!");
  });

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

  return false;
});

  database.ref().on("adding-child", function(childSnapshot, prevChildKey) {
    var firebaseName = childSnapshot.val().name;
    var firebaseDestination = childSnapshot.val().newDestination;
    var firebaseFirstTrain = childSnapshot.val().newFirstTrain;
    var firebaseFrequency = childSnapshot.val().newFrequency;

    var TimeDifference = moment().diff(
      moment.unix(firebaseFirstTrain),
      "minutes"
    );
    var RemainderTime =
      moment().diff(moment.unix(firebaseFirstTrain), "minutes") %
      firebaseFrequency;
    var convertedMin = firebaseFrequency - RemainderTime;

    var arrivalTime = moment()
      .add(convertedMin, "m")
      .format("hh:mm A");
    console.log(firebaseName);
    console.log(firebaseDestination);
    console.log(firebaseFrequency);
    console.log(arrivalTime);
    console.log(convertedMin);
    $("#table > tbody").append(
      "<tr><td>" +
        firebaseName +
        "</td><td>" +
        firebaseDestination +
        "</td><td>" +
        firebaseFrequency +
        "</td><td>" +
        arrivalTime +
        "</td><td>" +
        convertedMin +
        "</td></tr>"
    );
  });
