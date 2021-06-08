/**
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";

import { Gateway } from "../src/index.js";

const makeTarget = () => {
  return {
    postMessage: jest.fn(),
    addEventListener: jest.fn(),
  };
};

const makeIframe = () => {
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);

  return iframe;
};

// let mockTarget;
let iframe;

describe("Prestige", () => {
  beforeEach(() => {
    // mockTarget = makeTarget();
    iframe = makeIframe();
    // Create the target window fixture
    // Create the postMessage spy function
  });
  it("sends messages to the target window", async () => {
    const mockTarget = iframe.contentWindow;

    iframe.origin = "http://test.com";
    const postMessageCB = jest.fn();
    mockTarget.addEventListener("message", async () => {
      console.log("message", message);
      await postMessageCB();
    });

    const gateway = newGateway({
      name: "test",
      target: mockTarget,
      allowedMessageOrigin: "http://test.com",
    });

    gateway.send("message");
    gateway.send({ hello: "world" });
    expect(postMessageCB).toHaveBeenCalledTimes(2);
    expect(mockTarget.postMessage).toHaveBeenCalledWith("message");
    expect(mockTarget.postMessage).toHaveBeenCalledWith({ hello: "world" });
  });

  it("receives messages from the target window", (done) => {
    done();
  });

  it("rejects messages from windows whose origin is not allowed", () => {});

  it("emits events when a message is received from the target window", () => {});
});
