export interface EventStoreMessage {
  streamId: string;
  eventId: string;
  eventNumber: number;
  eventType: string;
  created: Date;
  metadata: {
    [key: string]: any;
  };
  isJson: boolean;
  data: {
    [key: string]: any;
  };
}
