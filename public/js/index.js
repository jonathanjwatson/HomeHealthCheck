// Get references to page elements
var $checkName = $("#check-name");
var $checkDescription = $("#check-description");
var $checkUrl = $("#check-url");
var $checkFrequency = $("#check-frequency");
var $submitBtn = $("#submit");
var $checkList = $("#check-list");
const $manualCheck = $(".runCheck");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(check) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/checks",
      data: JSON.stringify(check)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/checks",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/checks/" + id,
      type: "DELETE"
    });
  },
  runCheck: function(id) {
    console.log(id);
    let url = "http://localhost:3000/api/runChecks/" + id;
    return $.ajax({
      url: url,
      type: "GET"
    });
  }
};

// refreshExamples gets new checks from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $checks = data.map(function(check) {
      var $a = $("<a>")
        .text(check.name)
        .attr("href", "/check/" + check.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": check.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $checkList.empty();
    $checkList.append($checks);
  });
};

// handleFormSubmit is called whenever we submit a new check
// Save the new check to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var check = {
    name: $checkName.val().trim(),
    description: $checkDescription.val().trim(),
    url: $checkUrl.val().trim(),
    frequency: $checkFrequency.val().trim()
  };

  if (!(check.name && check.description)) {
    alert("You must enter an check text and description!");
    return;
  }

  API.saveExample(check).then(function() {
    refreshExamples();
  });

  $checkName.val("");
  $checkDescription.val("");
  $checkUrl.val("");
  $checkFrequency.val("");
};

var handleManualButtonClick = function(event) {
  event.preventDefault();
  console.log(event.target.id);
  let id = parseInt(event.target.id);

  API.runCheck(id).then(function(response) {
    console.log(response);
    // refreshExamples();
    alert("You received the following response: " + response);
  });
};

// handleDeleteBtnClick is called when an check's delete button is clicked
// Remove the check from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$checkList.on("click", ".delete", handleDeleteBtnClick);
$manualCheck.on("click", handleManualButtonClick);
