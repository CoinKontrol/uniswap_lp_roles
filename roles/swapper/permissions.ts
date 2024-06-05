import { c, forAll } from "zodiac-roles-sdk"
import contracts from "../../contracts"

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

export const oneOf = <T>(values: readonly T[]) => {
  if (values.length === 0) {
    throw new Error("`oneOf` values must not be empty")
  }

  return values.length === 1 ? values[0] : c.or(...(values as [T, T, ...T[]]))
}

const allowErc20Approve = (
  tokens: readonly `0x${string}`[],
  spenders: readonly `0x${string}`[]
) =>
  forAll(tokens, {
    signature: "approve(address,uint256)",
    condition: c.calldataMatches([oneOf(spenders)], ["address", "uint256"]),
  })

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