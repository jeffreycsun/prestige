import EventEmitter from "eventemitter3";
import { requiredParam } from "./utils/";

class Gateway {
  constructor({
    name = "Gateway",
    target = requiredParam("target"),
    allowedMessageOrigin = requiredParam("allowedMessageOrigin"),
    eventTypes = new Set([]),
    eventClassifier = defaultEventClassifier,
  } = {}) {
    this.name = name;
    this.target = target;
    this.allowedMessageOrigin = allowedMessageOrigin;
    this.eventTypes = new Set(eventTypes);
    this.eventClassifier = eventClassifier;

    this.emitter = new EventEmitter();

    console.log(
      `New Gateway created. ${name} will send and receive messages from ${allowedMessageOrigin}`
    );

    const handleMessage = createMessageHandler({
      allowedMessageOrigin,
      eventEmitter: this.emitter,
      eventTypes: this.eventTypes,
      eventClassifier: this.eventClassifier,
    });
    window.addEventListener("message", handleMessage);
  }

  send() {
    console.log("SEND CALLED WITH: ", arguments);
    if (typeof arguments == "string") {
      this.target.postMessage(arguments[0], this.allowedMessageOrigin);
    } else {
      const eventObject = arguments[0];
      console.log("EVENTOBJECT: ", eventObject);
      const { eventName, eventPayload } = eventObject;
      if (eventName == null) {
        throw new Error("Missing eventName");
      }
      if (eventPayload == null) {
        throw new Error("Missing eventPayload");
      }
      this.target.postMessage(
        { type: eventName, data: eventPayload },
        // "host-asdf",
        this.allowedMessageOrigin
      );
    }
  }

  on(eventName, callback) {
    this.emitter.on(eventName, callback);
  }
}

function defaultEventClassifier({ type, eventTypes }) {
  return eventTypes.has(type);
}

function createMessageHandler({
  allowedMessageOrigin,
  eventEmitter,
  eventTypes,
  eventClassifier,
}) {
  function handleMessage(message) {
    console.log(`MESSAGE RECEIVED BY ${this.name}: `, message);
    // Ignore messages not from this gateway's allowed origin
    if (message.origin !== allowedMessageOrigin) {
      return;
    }

    if (eventClassifier({ type: message.data.type, eventTypes })) {
      console.log("This should emit an event", message);
      eventEmitter.emit(message.data.type, message);
    } else {
      console.log("Generic message received: ", message);
    }
  }

  return handleMessage;
}

export { Gateway };
