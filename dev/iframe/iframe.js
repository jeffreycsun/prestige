import { Gateway } from "@prestige/prestige";

// Get UI Handles
const form = document.getElementById("form");
const eventNameInput = document.getElementById("event-name");
const eventPayloadInput = document.getElementById("event-payload");

// Set up Gateway configs
const target = window.parent.window;
const eventTypes = ["iframe-asdf", "iframe-dddd"];

// const eventClassifier = function ({ data, eventTypes }) {
//   console.log("eventTypes: ", eventTypes);
//   return eventTypes.has(data);
// };

const gateway = new Gateway({
  name: "IFRAME",
  target: target,
  allowedMessageOrigin: "http://localhost:3000",
  eventTypes: eventTypes,
});

form.onsubmit = (e) => {
  e.preventDefault();
  const eventName = eventNameInput.value;
  const eventPayload = eventPayloadInput.value;
  gateway.send({ eventName, eventPayload });
  reset();
};

function reset() {
  eventNameInput.value = "";
  eventPayloadInput.value = "";
  eventNameInput.focus();
}

gateway.on("iframe-asdf", () => {
  console.log("Received a message of type 'iframe-asdf'");
});

gateway.on("iframe-dddd", () => {
  console.log("Received a message of type 'iframe-dddd'");
});
