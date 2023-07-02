import { Context, Network } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { blockAuthor } from '../extension';

dotenv.config();

describe('blockAuthor', () => {
  let context: Context;

  beforeEach(() => {
    // @ts-ignore
    context = {
      metadata: {
        getNetwork: jest.fn().mockReturnValue(Network.POLYGON),
      },
      gateways: {
        getGateway: jest.fn().mockReturnValue(`https://polygon.gateway.tenderly.co/${process.env.TENDERLY_WEB3_GATEWAY_ACCESS_TOKEN}`),
      },
    };
  });

  test('Test Polygon Block Author with \'0x23320C0\'', async () => {
    const result = await blockAuthor(context, ['0x23320C0']);
    expect(result).toEqual('0x7c7379531b2aEE82e4Ca06D4175D13b9CBEafd49');
  });
});
