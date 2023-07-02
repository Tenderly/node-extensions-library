import { Context, Network } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { example } from '../extension';

dotenv.config();
jest.setTimeout(30000);

describe('exampleNodeExtensionJest', () => {
  let context: Context;

  beforeEach(() => {
    // @ts-ignore
    context = {
      metadata: {
        getNetwork: jest.fn().mockReturnValue(Network.MAINNET),
      },
      gateways: {
        getGateway: jest.fn().mockReturnValue(`https://mainnet.gateway.tenderly.co/${process.env.TENDERLY_WEB3_GATEWAY_ACCESS_TOKEN}`),
      },
    };
  });

  test('Gets the block by hash and compares block hashes', async () => {
    const response = await example(context, ['0x103235b']);
    expect(response.hash).toBe('0x140c6b75054fef9416112193f9811696797f7e64b6efeea8e96a40486a49a455');
  });

  test('Gets the block by number and compares block hashes', async () => {
    const response = await example(context, [100004]);
    expect(response.hash).toBe('0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63');
  });
});
