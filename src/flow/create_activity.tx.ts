export const CREATE_ACTIVITY = `
import ActivityContract from 0xActivityContract
import FungibleToken from 0xFungibleToken
import CCSToken from 0xCCSToken

transaction(title: String, metadata: String) {

  let toSendVault: @FungibleToken.Vault
  let signerAddress: Address

  prepare(signer: AuthAccount) {
    // Get a reference to the signer's stored vault
    let vaultRef = signer.borrow<&CCSToken.Vault>(from: CCSToken.VaultStoragePath)
      ?? panic("Could not borrow reference to the owner's Vault!")

    self.signerAddress = signer.address

    // Withdraw tokens from the signer's stored vault
    self.toSendVault <- vaultRef.withdraw(amount: ActivityContract.getCreateConsumption())
  }

  execute{
    ActivityContract.createActivity(
      vault: <-self.toSendVault,
      creator: self.signerAddress,
      title: title,
      metadata: metadata
    )
  }
}
`
