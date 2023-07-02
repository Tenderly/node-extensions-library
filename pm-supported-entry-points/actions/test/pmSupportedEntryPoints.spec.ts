import { Context, Event, ExtensionEvent, Network } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { pmSupportedEntryPoints } from '../extension';

dotenv.config();
jest.setTimeout(30000);

describe('pmSupportedEntryPoints', () => {
  let context: Context;
  let event: Event;

  beforeEach(() => {
    // @ts-ignore
    context = {
      metadata: {
        getNetwork: jest.fn().mockReturnValue(Network.GOERLI),
      },
      secrets: {
        get: jest.fn().mockReturnValue(process.env.PIMLICO_API_KEY),
      },
    };
    (event as ExtensionEvent) = [];
  });

  test('Sends the pm_supportedEntryPoints request', async () => {
    const response = await pmSupportedEntryPoints(context, event);
    expect(response).toBeInstanceOf(Array);
  });
});
