import { Context, Event, WebhookEvent } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { example } from '../extension';

dotenv.config();
jest.setTimeout(30000);

describe('exampleNodeExtensionJest', () => {
  let context: Context;
  let event: Event;

  beforeEach(() => {
    // @ts-ignore
    context = {
      gateways: {
        getGateway: jest.fn().mockReturnValue(`https://mainnet.gateway.tenderly.co/${process.env.TENDERLY_WEB3_GATEWAY_ACCESS_TOKEN}`),
      },
    };
    (event as WebhookEvent) = {
      time: new Date(),
      payload: {
        blockNumber: '0x103235b',
      },
    };
  });

  test('Gets the block by number and compares block hashes', async () => {
    const response = await example(context, event);
    expect(response.hash).toBe('0x140c6b75054fef9416112193f9811696797f7e64b6efeea8e96a40486a49a455');
  });
});
