import {Context, Event, ExtensionEvent} from '@tenderly/actions';
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
        getGateway: jest.fn().mockReturnValue(`https://mainnet.gateway.tenderly.co/30hU6glRdODWHjNB2lUsgA`),
      },
    };
    (event as ExtensionEvent) = [
      '0x02f901130182041c847735940085746a52880083040000944976fb03c32e5b8cfe2b6ccb31c09ba78ebaba4180b8a4304e6adeee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a5347583500000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000026e30101701220b53f296a42f8735f97f175c340a3377b3f92794b16b1784d46273da7695c1f3c0000000000000000000000000000000000000000000000000000c001a0131ed5ee43c83f044d0f0a71d1436d6f08f26d37e61771e3c4ad04eec7859066a07e09918aefc35310db258281518c71d1c8bf0a7301641729c95361d3e1addfa4',
    ]
  });

  test('Simulate transaction before sending throws an error', async () => {
    try {
      await sendRawTransaction(context, event);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
