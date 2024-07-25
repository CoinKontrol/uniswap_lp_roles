import type { Contracts } from "./.lib/types";

export default {
  arbitrumOne: {
    usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    arb: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    wbtc: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    weth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    uniswap: {
      positionNft: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
    },
    cowswap: {
      orderSigner: "0x23dA9AdE38E4477b23770DeD512fD37b12381FAB",
      gpv2VaultRelayer: "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110"
    }
  }
} satisfies Contracts;
