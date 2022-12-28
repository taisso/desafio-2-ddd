import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import ChangeAddressEvent from "../change-address.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<ChangeAddressEvent>
{
  handle(event: ChangeAddressEvent): void {
    const data = event.eventData;
    console.log(
      `Endereço do cliente: ${data.id}, ${data.name} alterado para: ${data.Address}`
    );
  }
}
