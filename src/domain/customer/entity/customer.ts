import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import EventInterface from "../../@shared/event/event.interface";
import ChangeAddressEvent from "../event/change-address/change-address.event";
import CustomerCreatedEvent from "../event/customer-created/customer-created.event";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this._eventDispatcher = new EventDispatcher()
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
  
  get Address(): Address {
    return this._address;
  }
  
  get eventDispatcher(): EventDispatcher {
    return this._eventDispatcher;
  }
  
  set Address(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }
  
  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }
  
  changeAddress(address: Address) {
    this._address = address;
    this.notifyEvent(new ChangeAddressEvent(this))
  }

  private notifyEvent(event: EventInterface) {
    this._eventDispatcher.notify(event)
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  notificationWhenCreatedCustomer() {
    this.notifyEvent(new CustomerCreatedEvent())
  }
}
