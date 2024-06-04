import { c, forAll } from "zodiac-roles-sdk"

const arb = "0x912CE59144191C1204E64559FE8253a0e49E6548";
const usdc = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
const positionNft = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"

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

export default [
  allowErc20Approve([arb, usdc], [positionNft]),
  allow.arbitrumOne.uniswap.positions_nft.mint({
    token0: arb,
    token1: usdc,
    fee: 500,
    recipient: c.avatar,
  })
] satisfies Permissions;
