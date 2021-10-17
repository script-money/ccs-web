export const GET_CCS_BALANCE = `
import CCSToken from 0xCCSToken
import FungibleToken from 0xFungibleToken

pub fun main(address: Address): UFix64 {
  let account = getAccount(address)

  let vaultRef = account.getCapability(CCSToken.BalancePublicPath)!.borrow<&CCSToken.Vault{FungibleToken.Balance}>()
    ?? panic("Could not borrow Balance reference to the Vault")

  return vaultRef.balance
}
`
