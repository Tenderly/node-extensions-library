import {Context, Event, ExtensionEvent, Network} from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { chainlinkPriceFeed } from '../extension';

dotenv.config();

describe('chainlinkPriceFeed', () => {
  let context: Context;
  let event: Event;

  beforeEach(() => {
    // @ts-ignore
    context = {
      metadata: {
        getNetwork: jest.fn().mockReturnValue(Network.MAINNET)
      },
      gateways: {
        getGateway: jest.fn().mockReturnValue(`https://mainnet.gateway.tenderly.co/${process.env.TENDERLY_WEB3_GATEWAY_ACCESS_TOKEN}`),
      },
    };
    (event as ExtensionEvent) = [
      "1INCH/ETH"
    ]
  });

  test('Test 1INCH/ETH pair', async () => {
    const result = await chainlinkPriceFeed(context, event);
    expect(result.data.length).toEqual(5);
  });
});
