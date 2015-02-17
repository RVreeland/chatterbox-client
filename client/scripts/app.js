// YOUR CODE HERE:
var url = "https://api.parse.com/1/classes/chatterbox";
var messages = [];


//Display Code
var displayMessages = function () {
  var messageContainer = $('.messages');
  _.each(messages, function (message) {
    var user = '<span class="username">' + message.username + '</span>';
    var time = message.createdAt;
    var timestamp = '<span class="timestamp">' + time.toLocaleDateString() + ' ' + time.toLocaleTimeString() + '</span>';
    var messageHtml = '<div class="message-text">' + message.text + '</div>';
    var fullMessage = $('<div class="chat">' + user + ' ' + timestamp + messageHtml + '</div>');
    messageContainer.append(fullMessage);
  });
};


// Get our data
// Expect response to be:
//  { results:
//      [ { keys are: createdAt, objectId, roomname, text, updatedAt, username}, ...]
//  }
$.get(url, function (response) {
  console.log(response);
  var results = _.filter(response.results, function(message) {
    return message.text !== undefined && message.username !== undefined;
  });
  _.each(results, function (message) {
    message.createdAt = new Date(message.createdAt);
  });
  results.sort(function (a, b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return 0;
    }
  });
  messages = messages.concat(results);
  displayMessages();
});


