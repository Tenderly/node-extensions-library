import { Context, Event, Network, WebhookEvent } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { getChainLinkPriceFeed } from '../extension';

dotenv.config();

describe('getChainLinkPriceFeed', () => {
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
        network: Network.MAINNET,
        coinPair: '1INCH/ETH',
      },
    };
  });

  test('Test 1INCH/ETH pair', async () => {
    const result = await getChainLinkPriceFeed(context, event);
    expect(result.data.length).toEqual(5);
  });
});
