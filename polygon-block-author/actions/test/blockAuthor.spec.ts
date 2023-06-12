import {Context, Event, ExtensionEvent, Network} from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { blockAuthor } from '../extension';

dotenv.config();

describe('borAuthor', () => {
  let context: Context;
  let event: Event;

  beforeEach(() => {
    // @ts-ignore
    context = {
      metadata: {
        getNetwork: jest.fn().mockReturnValue(Network.POLYGON)
      },
      gateways: {
        getGateway: jest.fn().mockReturnValue(`https://polygon.gateway.tenderly.co/${process.env.TENDERLY_WEB3_GATEWAY_ACCESS_TOKEN}`),
      },
    };
    (event as ExtensionEvent) = ['0x23320C0'];
  });

  test('Test Polygon Block Author', async () => {
    const result = await blockAuthor(context, event);
    expect(result).toEqual("0x7c7379531b2aEE82e4Ca06D4175D13b9CBEafd49");
  });
});
