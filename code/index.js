const { ethers } = require('ethers');
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require('defender-relay-client/lib/ethers');

const VerifierABI = [
  { inputs: [], name: 'EC_SCALAR_MUL_FAILURE', type: 'error' },
  { inputs: [], name: 'MOD_EXP_FAILURE', type: 'error' },
  { inputs: [], name: 'PROOF_FAILURE', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'expected', type: 'uint256' },
      { internalType: 'uint256', name: 'actual', type: 'uint256' },
    ],
    name: 'PUBLIC_INPUT_COUNT_INVALID',
    type: 'error',
  },
  { inputs: [], name: 'PUBLIC_INPUT_GE_P', type: 'error' },
  { inputs: [], name: 'PUBLIC_INPUT_INVALID_BN128_G1_POINT', type: 'error' },
  {
    inputs: [],
    name: 'getVerificationKeyHash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes', name: '_proof', type: 'bytes' },
      { internalType: 'bytes32[]', name: '_publicInputs', type: 'bytes32[]' },
    ],
    name: 'verify',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];
exports.handler = async function (payload) {
  const verifierAddress = '0x53783878377fead9323973f5617fE634105Ca484';
  const factoryAddress = '';
  const zkProof = '';

  const provider = new DefenderRelayProvider(payload);
  const signer = new DefenderRelaySigner(payload, provider, { speed: 'fast' });
  const body = payload.request.body;
  const verifier = new ethers.Contract(verifierAddress, VerifierABI, signer);
  const factory = new ethers.Contract(factoryAddress, body.factory.abi, signer);
  const token = new ethers.Contract(
    body.transaction.to,
    body.monitor.abi,
    signer
  );
  try {
    const value = await factory.something(body.transaction.to);
    const result = await verifier.verify(zkProof, value);
    if (!result) {
      throw new Error('Invalid proof');
    }
  } catch (e) {
    console.error(e);
    token.pause();
    return { result: 'paused' };
  }

  return { result: 'success' };
};
