import { c } from "zodiac-roles-sdk"
import contracts from "../../contracts"
import { oneOf, allowErc20Approve } from "../../utils"

const arb = contracts.arbitrumOne.arb;
const usdc = contracts.arbitrumOne.usdc;
const wbtc = contracts.arbitrumOne.wbtc;
const weth = contracts.arbitrumOne.weth;

const GPv2VaultRelayer = contracts.arbitrumOne.cowswap.gpv2VaultRelayer;
const E_ADDRESS = contracts.arbitrumOne.cowswap.eAddress;

const tokens = [
  arb,
  wbtc,
  weth,
  usdc
]

const orderStructScoping = {
  sellToken: oneOf(tokens),
  buyToken: [E_ADDRESS, arb, usdc, wbtc] && oneOf([E_ADDRESS, arb, usdc, wbtc]),
  receiver: c.avatar,
}  

export default [
  allowErc20Approve(tokens, [GPv2VaultRelayer]),
  allow.arbitrumOne.cowswap.orderSigner.signOrder(
    orderStructScoping,
    undefined,
    undefined,
    { delegatecall: true }
  ),
  allow.arbitrumOne.cowswap.orderSigner.unsignOrder(orderStructScoping, {
    delegatecall: true,
  })
] satisfies Permissions;
