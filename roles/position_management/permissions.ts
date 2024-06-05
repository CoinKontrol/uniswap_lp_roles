import { c, forAll } from "zodiac-roles-sdk"
import contracts from "../../contracts"

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
  allowErc20Approve([contracts.arbitrumOne.arb, contracts.arbitrumOne.usdc], [contracts.arbitrumOne.uniswap.positionNft]),
  allow.arbitrumOne.uniswap.positions_nft.mint({
    token0: contracts.arbitrumOne.arb,
    token1: contracts.arbitrumOne.usdc,
    fee: 500,
    recipient: c.avatar,
  })
] satisfies Permissions;
