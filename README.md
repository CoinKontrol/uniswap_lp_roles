# uniswap_lp_roles

This repository is a fork of the [permissions-starter-kit](https://github.com/gnosisguild/permissions-starter-kit).

### Apply Updates

Once you have defined all permissions for the role, you can apply the update to your Roles mod.
If you need to set up a new Roles mod from scratch, refer to [this tutorial](https://zodiac.wiki/index.php?title=Roles_Modifier:_Operator_Tutorial).

In your terminal, run the following command:

```
yarn apply <role_key> <prefixed_address>
```

For example, to apply the role `eth_wrapping` to a mainnet Roles mod at address `0x1234123412341234123412341234123412341234`:

```
yarn apply eth_wrapping eth:0x1234123412341234123412341234123412341234
```

This will direct you to the Roles app, where you can review the updates that will be made to your role and confirm them by signing the apply transaction.

Applying permissions for the first time will create a new role.
Subsequent applications will update the existing role, efficiently removing, updating, and adding permissions so that the role configuration on chain accurately reflects the permissions defined in code.

## Folder Structure and Conventions

- [contracts.ts](./contracts.ts) – Lists all contracts that are used as targets in permissions
- [roles/](./roles) – Host directory for role configurations
  - [`role_key`/](./roles/eth_wrapping) – Each subfolder represents a distinct role. The folder name will be used as the [role key](#role-keys).
    - [permissions.ts](./roles/eth_wrapping/permissions.ts) – Defines all permissions for this role

There are some additional files and folders in the template repository, which you won't usually need to edit.
They contain the necessary wiring for automatically applying the permissions.

##### Role Keys

In the Zodiac Roles Modifier, every role is identified by a `bytes32` string.
Choose a role key that accurately describes the purpose of the role.
We recommend using only the following characters for role keys: `a...z`, `0...9`, `_`
The length must be less than 32 characters.

##### Prefixed Addresses

The Roles tooling adopts [EIP-3770](https://eips.ethereum.org/EIPS/eip-3770) chain-specific addresses for identifying a contract on a specific chain in a compact way:

```
eth:0x1234123412341234123412341234123412341234
```

Chain prefixes for the supported chains are as follows:

- Mainnet: `eth`
- Gnosis Chain: `gno`
- Polygon: `matic`
- Arbitrum One: `arb1`
- Avalanche: `avax`
- Polygon Mumbai Testnet: `maticMumbai`
- Sepolia Testnet: `sep`
