import { Context, Event, ExtensionEvent, Network } from '@tenderly/actions';
import * as dotenv from 'dotenv';
import { pmCanSponsorUserOperation } from '../extension';

dotenv.config();
jest.setTimeout(30000);

describe('pmCanSponsorUserOperation', () => {
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
    (event as ExtensionEvent) = [
      {
        'sender': '0x1234567890123456789012345678901234567890',
        'nonce': '0x1',
        'initCode': '0x',
        'callData': '0x',
        'callGasLimit': '0x100000',
        'verificationGasLimit': '0x20000',
        'preVerificationGas': '0x10000',
        'maxFeePerGas': '0x3b9aca00',
        'maxPriorityFeePerGas': '0x3b9aca00',
        'paymasterAndData': '0x',
        'signature': '0x',
      },
      {
        'entryPoint': '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      },
      {
        'referralAddress': '0x2109876543210987654301098765432198765432',
      },
    ];
  });

  test('Sends the pm_canSponsorUserOperation request', async () => {
    const response = await pmCanSponsorUserOperation(context, event);
    expect('paymasterAndData' in response).toBeTruthy();
  });
});
