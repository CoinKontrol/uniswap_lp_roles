import { c } from "zodiac-roles-sdk"
import contracts from "../../contracts"
import { oneOf, allowErc20Approve } from "../../utils"

export default [
  allowErc20Approve([contracts.arbitrumOne.arb, contracts.arbitrumOne.usdc], [contracts.arbitrumOne.uniswap.positionNft]),
  allow.arbitrumOne.uniswap.positions_nft.mint({
    token0: contracts.arbitrumOne.arb,
    token1: contracts.arbitrumOne.usdc,
    fee: 500,
    recipient: c.avatar,
  }),
  allow.arbitrumOne.uniswap.positions_nft.collect({
    recipient: c.avatar
  }),
] satisfies Permissions;
