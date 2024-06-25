import { c } from "zodiac-roles-sdk"
import contracts from "../../contracts"
import { oneOf, allowErc20Approve } from "../../utils"

export default [
  allowErc20Approve([contracts.arbitrumOne.arb, contracts.arbitrumOne.usdc], [contracts.arbitrumOne.uniswap.positionNft]),
  allow.arbitrumOne.uniswap.positionNft.mint({
    token0: contracts.arbitrumOne.arb,
    token1: contracts.arbitrumOne.usdc,
    fee: 500,
    recipient: c.avatar,
  }),
  allow.arbitrumOne.uniswap.positionNft.collect({
    recipient: c.avatar
  }),
  allow.arbitrumOne.uniswap.positionNft.increaseLiquidity(
    {
      tokenId: nftIds ? oneOf(nftIds) : c.avatarIsOwnerOfErc721,
    },
    {
      send: true,
    }
  ),
  allow.arbitrumOne.uniswap.positionNft.decreaseLiquidity(
    nftIds
      ? {
          tokenId: oneOf(nftIds),
        }
      : undefined
  )
] satisfies Permissions;
