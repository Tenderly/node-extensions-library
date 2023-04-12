import { Context, Event, WebhookEvent } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { sendRawTransaction } from '../extension';

dotenv.config();

describe('sendRawTransaction', () => {
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
        data: '0x02f871018302e67c80850562ac7da9827530944675c7e5baafbffbca748158becba61ef3b0a26387892f979bff1e8480c080a02c0c4fc3543712113a8a3fffc8e0bd31e152f3563817d585c75638768e89badca0416a72bb57c2378e79cb52d8b2d589f1bca069662501c94d990dba02be8e61c2',
      },
    };
  });

  test('Simulate transaction before sending throws an error', async () => {
    try {
      await sendRawTransaction(context, event);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
