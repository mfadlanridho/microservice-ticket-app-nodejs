import { Publisher, Subjects, TicketUpdatedEvent } from '@mfrtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}