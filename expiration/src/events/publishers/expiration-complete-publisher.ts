import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@mfrtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
