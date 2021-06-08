import { Gateway } from "@prestige/prestige";

// Get UI Handles
const iframe = document.getElementById("iframe");
const form = document.getElementById("form");
const eventNameInput = document.getElementById("event-name");
const eventPayloadInput = document.getElementById("event-payload");

// Set up Gateway configs
const target = iframe.contentWindow;
const eventTypes = ["host-asdf", "host-dddd"];

// const eventClassifier = function ({ data, eventTypes }) {
//   console.log("eventTypes: ", eventTypes);
//   return eventTypes.has(data);
// };

const gateway = new Gateway({
  name: "HOST",
  target: target,
  allowedMessageOrigin: "http://localhost:5000",
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

gateway.on("host-asdf", () => {
  console.log("Received a message of type 'host-asdf'");
});

gateway.on("host-dddd", () => {
  console.log("Received a message of type 'host-dddd'");
});
