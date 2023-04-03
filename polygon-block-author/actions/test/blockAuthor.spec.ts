import { Context, Event, Network, WebhookEvent } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { blockAuthor } from '../extension';

dotenv.config();

describe('borAuthor', () => {
  let context: Context;
  let event: Event;

  beforeEach(() => {
    // @ts-ignore
    context = {
      gateways: {
        getGateway: jest.fn().mockReturnValue(`https://polygon-mainnet.gateway.tenderly.co/${process.env.TENDERLY_WEB3_GATEWAY_ACCESS_TOKEN}`),
      },
    };
    (event as WebhookEvent) = {
      time: new Date(),
      payload: {
        network: Network.MAINNET,
        data: '0x23320C0',
      },
    };
  });

  test('Test Polygon Block Author', async () => {
    const result = await blockAuthor(context, event);
    expect(result).toEqual("0x7c7379531b2aEE82e4Ca06D4175D13b9CBEafd49");
  });
});
