import { TCPClient, EventFactory, NewEvent } from 'geteventstore-promise';

export class EventStore {
  type: string;
  eventFactory: EventFactory;
  client: TCPClient;

  constructor() {
    this.type = 'event-store';
    this.eventFactory = new EventFactory();
  }

  connect(config) {
    this.client = new TCPClient(config);
    return this;
  }

  getClient(): TCPClient {
    return this.client;
  }

  newEvent(name, payload): NewEvent {
    return this.eventFactory.newEvent(name, payload);
  }

  close() {
    this.client.close();
    return this;
  }
}
