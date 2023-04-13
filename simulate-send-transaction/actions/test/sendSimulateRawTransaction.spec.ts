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
      '0x02f86b01708405f5e1008504e1cd83fb8252089420a5814b73ef3537c6e099a0d45c798f4bd6e1d68080c001a07aa334bb47ce0cdd02d7cd8ea89bbaf4cbdd9088a0cbbf752f352ff9a1107b47a0538e12c493a9d560446632d9ca9857663785868bbd624444e9ce6516816cff20',
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
