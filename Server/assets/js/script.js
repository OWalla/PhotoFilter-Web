$(document).ready(function() {

    var url = window.location.href;
    var screenId = url.substr(url.indexOf('=') + 1);
    var messages = [];
    var messageId = 0;

    $.ajax({
        url: "screenData=" + screenId,
        context: "application/json",
        dataType: "json"
    }).done(function(data) {
        if (data == null || data.length == 0) {
            alert("They are no matching messages!");
        } else {
            messages = data;
            $("#message").fadeOut('slow', function() {
                displayMessage(messages[messageId]);
            });
        }
    });

    $("#message").hide();

    function getNextMessage() {
        if (++messageId == messages.length) {
            messageId = 0;
        }

        $("#message").fadeOut('slow', function() {
            displayMessage(messages[messageId]);
        });
    }

    function displayMessage(message) {
        // Load template
        $("#message").load("assets/templates/" + message.template + ".html", function() {
            // Populate data
            var imageIndex = 0,
                textIndex = 0;

            while (textIndex < message.texts.length || imageIndex < message.images.length) {
                for (var i = 0; i < 2 && textIndex < message.texts.length; i++) {
                    $("#message .textField").append("<span>" + message.texts[textIndex] + "</span>");
                    textIndex++;
                }

                if (imageIndex < message.images.length) {
                    $("#message .imageField").append("<img src=\"" + message.images[imageIndex] + "\" />");
                    imageIndex++;
                }
            }

            // Show message
            $("#message").fadeIn('slow');
        })

        window.setTimeout(getNextMessage, message.displayTime * 1000)
    }
});
