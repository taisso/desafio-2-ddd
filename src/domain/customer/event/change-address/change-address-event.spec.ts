import { randomUUID } from "node:crypto";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import SendConsoleLogHandler from "./handler/send-console-log.handle";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

const createCustomerWithEvent = (
  eventName: string,
  eventHandler: EventHandlerInterface
) => {
  const address = new Address("Rua dois", 123, "12345-678", "São Paulo");
  const customer = new Customer(randomUUID(), "Carlos");
  customer.eventDispatcher.register(eventName, eventHandler);
  customer.changeAddress(address);

  return customer;
};

describe("ChangeAddressEvent unit tests", () => {
  it("should notify SendConsoleLogHandler event handler when address changes", () => {
    const eventName = "ChangeAddressEvent";
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const customer = createCustomerWithEvent(eventName, eventHandler);
    const eventDispatcher = customer.eventDispatcher;

    expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(
      eventHandler
    );

    expect(spyEventHandler).toHaveBeenCalled();
  });

});
