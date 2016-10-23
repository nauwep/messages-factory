"use strict";

class MessagesFactory {

    constructor(messageDefinitions = []) {

        if (messageDefinitions === null || !Array.isArray(messageDefinitions)) {
            throw new Error('messages must be defined as an Array of message definition');
        }

        messageDefinitions.forEach((messageDefinition) => {
            let code = messageDefinition.code;
            let message = messageDefinition.message;

            let messageFunction = function(...values) {
                let formattedMessage = message;
                values.forEach((value, index) => {
                    formattedMessage = formattedMessage.replace(
                        `{${index}}`,
                        value);
                });
                return formattedMessage;
            };

            messageFunction.toString = function() {
                return message;
            };

            Object.defineProperty(this, code, {
                value: messageFunction
            });

        });

    }

}

module.exports = MessagesFactory;
