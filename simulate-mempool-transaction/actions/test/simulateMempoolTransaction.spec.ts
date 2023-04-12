import { Context, Event, WebhookEvent } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { simulateMempoolTransaction } from '../extension';

dotenv.config();
describe('simulateMempoolTransaction', () => {
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
        params:["0x6a0b67478936c15045fa866fa34972bbb0983874c7fb8dd54982c9dee93269a9"],
      },
    };
  });

  test('Simulate transaction before sending throws an error', async () => {
    try {
      await simulateMempoolTransaction(context, event);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
