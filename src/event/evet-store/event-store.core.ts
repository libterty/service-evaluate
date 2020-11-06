import { Inject, Injectable, Logger } from '@nestjs/common';
import { IEventPublisher } from '@nestjs/cqrs/dist/interfaces/events/event-publisher.interface';
import { IMessageSource } from '@nestjs/cqrs/dist/interfaces/events/message-source.interface';
import { IEvent } from '@nestjs/cqrs/dist/interfaces/events/event.interface';
import { Subject } from 'rxjs';
import * as xml2js from 'xml2js';
import * as http from 'http';
import { config } from '../../../config';

const eventStoreHostUrl =
  config.EVENT_STORE_SETTINGS.protocol +
  `://${config.EVENT_STORE_SETTINGS.hostname}:${config.EVENT_STORE_SETTINGS.httpPort}/streams/`;

@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {
  private category: string;
  private eventStore: any;
  private eventHandlers: {
    [key: string]: any;
  };
  constructor(@Inject('Event_STORE_PROVIDER') eventStore: any) {
    this.category = 'rate';
    this.eventStore = eventStore;
    this.eventStore.connect({
      hostname: config.EVENT_STORE_SETTINGS.hostname,
      port: config.EVENT_STORE_SETTINGS.tcpPort,
      credentials: config.EVENT_STORE_SETTINGS.credentials,
      poolOptions: config.EVENT_STORE_SETTINGS.poolOptions,
    });
  }

  /**
   * @description Publish Event
   * @param {T} event
   * @returns {Promise<void>}
   */
  async publish<T extends IEvent>(event: T): Promise<void> {
    const message: Record<string, unknown> = JSON.parse(JSON.stringify(event));
    const rateId: string = message.rateId || message.rateDto['rateId'];
    const streamName = `${this.category}-${rateId}`;
    const type: string = event.constructor.name;
    try {
      await this.eventStore.client.writeEvent(streamName, type, event);
    } catch (error) {
      Logger.log(error.message, 'Publish', true);
    }
  }

  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>): Promise<void> {
    const streamName = `$ce-${this.category}`;

    const onEvent = async (event): Promise<void> => {
      const eventUrl: string =
        eventStoreHostUrl +
        `${event['metadata']['$o']}/${event['data'].split('@')[0]}`;
      http.get(eventUrl, res => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => (rawData += chunk));
        res.on('end', () => {
          xml2js.parseString(rawData, (err, result) => {
            if (err) {
              return Logger.log(err.message, 'ParseString', true);
            }
            const content = result['atom:entry']['atom:content'][0];
            const eventType = content.eventType[0];
            const data = content.data[0];
            event = this.eventHandlers[eventType](...Object.values(data));
            subject.next(event);
          });
        });
      });
    };

    const onDropped = (sub, reason, err): void => {
      Logger.log(`${sub}-${reason}-${err}`, 'Droppped', true);
    };

    try {
      await this.eventStore.client.subscribeToStream(
        streamName,
        onEvent,
        onDropped,
        false,
      );
    } catch (error) {
      Logger.log(error.message, 'Bridge', true);
    }
  }

  setEventHandlers(eventHandlers): void {
    this.eventHandlers = eventHandlers;
  }
}
