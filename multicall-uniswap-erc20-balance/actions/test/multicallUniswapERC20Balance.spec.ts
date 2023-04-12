import {Context, Event, ExtensionEvent} from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { multicallUniswapERC20Balance } from '../extension';

dotenv.config();

describe('multicallUniswapERC20Balance', () => {
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
        "0x0", "0xff"
    ]
  });

  test('Multicall Uniswap ERC20 balance', async () => {
    const decoded = await multicallUniswapERC20Balance(context, event);
    expect(decoded.length).toEqual(400);
  });
});
