import {Context, Event, ExtensionEvent} from '@tenderly/actions';
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
    (event as ExtensionEvent) = [
      "0x9e33adb48052b2748214f4ab1016c2a952e291f060464a95dd93f3525d53cccb"
    ]
  });

  test('Simulate transaction before sending throws an error', async () => {
    try {
      await simulateMempoolTransaction(context, event);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
