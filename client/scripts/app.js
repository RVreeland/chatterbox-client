// YOUR CODE HERE:
var url = "https://api.parse.com/1/classes/chatterbox";
var messages = [];


//Display Code
var displayMessages = function (undisplayedMessages) {
  var messageContainer = $('.messages');
  _.each(undisplayedMessages, function (message) {
    var $user = $('<span class="username"></span>');
    $user.text(message.username + ' ');
    var time = message.date;
    var $timestamp = $('<span class="timestamp"></span>');
    $timestamp.text(time.toLocaleDateString() + ' ' + time.toLocaleTimeString());
    var $messageHtml = $('<div class="message-text"></div>');
    $messageHtml.text(message.text);
    var $fullMessage = $('<div class="chat"></div>');
    $fullMessage.append($user);
    $fullMessage.append($timestamp);
    $fullMessage.append($messageHtml);
    messageContainer.prepend($fullMessage);
  });
};


// Get our data
// Expect response to be:
//  { results:
//      [ { keys are: createdAt, objectId, roomname, text, updatedAt, username}, ...]
//  }
//  restrict with url + '?' + $.param({where: {createdAt: {__type: 'Date', iso: message.createdAt}}, ... }})

var getMessages = function() {
  var requestURL = url;
  var getMessagesFrom = messages.length > 0
                          ? messages[0].createdAt
                          : new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  requestURL = requestURL + '?' + $.param({
    where: {
      createdAt: {
        $gt: {
          __type: 'Date',
          iso: getMessagesFrom
        }
      }
    }
  });
  $.get(requestURL, function (response) {
    // console.log(response);
    var results = _.filter(response.results, function(message) {
      return message.text !== undefined && message.username !== undefined;
    });
    _.each(results, function (message) {
      message.date = new Date(message.createdAt);
    });
    results.sort(function (a, b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    messages = results.concat(messages);
    displayMessages(results);
  });
  // setTimeout(getMessages, 5000);
};

getMessages();









