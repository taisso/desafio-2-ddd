import { randomUUID } from 'node:crypto'
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import SendConsoleLog1Handler from "./handler/send-console-log-1.handle";
import SendConsoleLog2Handler from "./handler/send-console-log-2.handle";

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

describe("CustomerCreatedEvent unit tests", () => {
  it("should notify SendConsoleLog1Handler event handler when create customer", () => {
    const eventName = "CustomerCreatedEvent";
    const eventHandler = new SendConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const customer = createCustomerWithEvent(eventName, eventHandler);
    customer.notificationWhenCreatedCustomer()
    const eventDispatcher = customer.eventDispatcher;
    const event = eventDispatcher.getEventHandlers[eventName][0];

    expect(event).toMatchObject(eventHandler);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify SendConsoleLog2Handler event handler when create customer", () => {
    const eventName = "CustomerCreatedEvent";
    const eventHandler = new SendConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const customer = createCustomerWithEvent(eventName, eventHandler);
    customer.notificationWhenCreatedCustomer()
    const eventDispatcher = customer.eventDispatcher;
    const event = eventDispatcher.getEventHandlers[eventName][0];

    expect(event).toMatchObject(eventHandler);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
