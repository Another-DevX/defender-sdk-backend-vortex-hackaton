import { Router } from 'express';
import { Defender } from '@openzeppelin/defender-sdk';

const creds = {
  apiKey: '7tonHw3oLz1GiQJTPzMnJPdDQ97n4Ztv',
  apiSecret: '4fLyLpUwfJH9p8RFoXy23VHSxJSDbZmzGWd5yUiAKqg3uGjJvGf6RrUCnp8B2bEr',
};
const client = new Defender(creds);
const routes = Router();

routes.post('/add-address', async (req, res) => {
  const monitor = await client.monitor.get(
    '639ec697-6b6e-4160-a328-0fb0e036ec48'
  );
  const monitorBody = {
    network: 'scroll-sepolia',
    blockWatcherId: 'scroll-sepolia-1',
    addressRules: [
      {
        conditions: [],
        abi: '[{"type":"event","anonymous":false,"name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"spender","indexed":true},{"type":"uint256","name":"value","indexed":false}]},{"type":"event","anonymous":false,"name":"EIP712DomainChanged","inputs":[]},{"type":"event","anonymous":false,"name":"Transfer","inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"value","indexed":false}]},{"type":"function","name":"DOMAIN_SEPARATOR","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"bytes32"}]},{"type":"function","name":"allowance","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"},{"type":"address","name":"spender"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"approve","constant":false,"payable":false,"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"value"}],"outputs":[{"type":"bool"}]},{"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"account"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"decimals","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint8"}]},{"type":"function","name":"eip712Domain","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"bytes1","name":"fields"},{"type":"string","name":"name"},{"type":"string","name":"version"},{"type":"uint256","name":"chainId"},{"type":"address","name":"verifyingContract"},{"type":"bytes32","name":"salt"},{"type":"uint256[]","name":"extensions"}]},{"type":"function","name":"name","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string"}]},{"type":"function","name":"nonces","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"permit","constant":false,"payable":false,"inputs":[{"type":"address","name":"owner"},{"type":"address","name":"spender"},{"type":"uint256","name":"value"},{"type":"uint256","name":"deadline"},{"type":"uint8","name":"v"},{"type":"bytes32","name":"r"},{"type":"bytes32","name":"s"}],"outputs":[]},{"type":"function","name":"symbol","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string"}]},{"type":"function","name":"totalSupply","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"transfer","constant":false,"payable":false,"inputs":[{"type":"address","name":"to"},{"type":"uint256","name":"value"}],"outputs":[{"type":"bool"}]},{"type":"function","name":"transferFrom","constant":false,"payable":false,"inputs":[{"type":"address","name":"from"},{"type":"address","name":"to"},{"type":"uint256","name":"value"}],"outputs":[{"type":"bool"}]}]',
        addresses: [...monitor.addresses, ...req.body.addresses],
        skipABIValidation: true,
      },
    ],
    addresses: [...monitor.addresses, ...req.body.addresses],
  };
  const result = await client.monitor.update(
    '639ec697-6b6e-4160-a328-0fb0e036ec48',
    monitorBody
  );
  console.log({ result });
  res.send({ result });
});

routes.get('/get-monitor', async (req, res) => {
  const result = await client.monitor.get(
    '639ec697-6b6e-4160-a328-0fb0e036ec48'
  );
  console.log(result.addresses);
  res.send({ result });
});

export default routes;
