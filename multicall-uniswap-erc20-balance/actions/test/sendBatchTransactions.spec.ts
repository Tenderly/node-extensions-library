import { Context, Event, WebhookEvent } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { sendBatchTransactions } from '../extension';

dotenv.config();

describe('sendBatchTransactions', () => {
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
        input: '0xa5a2deb80000000000000000000000020a5814b73ef3537c6e099a0d45c798f4bd6e1d600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb20000000000000000000000000000000000000000000000000000000000000002',
      },
    };
  });

  test('Send batch transactions', async () => {
    const decoded = await sendBatchTransactions(context, event);
    expect(decoded.length).toEqual(50);
  });
});
