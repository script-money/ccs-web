export const BUY_BALLOTS = `
import BallotContract from 0xBallotContract
import FungibleToken from 0xFungibleToken
import CCSToken from 0xCCSToken

transaction(count: Int){
  let toSendVault: @FungibleToken.Vault
  let ballotCollectionRef: &BallotContract.Collection

  prepare(signer: AuthAccount) {
    // Get a reference to the signer's stored vault
    let vaultRef = signer.borrow<&CCSToken.Vault>(from: CCSToken.VaultStoragePath)
      ?? panic("Could not borrow reference to the owner's Vault, set account first!")

    self.ballotCollectionRef = signer.borrow<&BallotContract.Collection>(from: BallotContract.CollectionStoragePath)
      ?? panic("Could not borrow reference to the owner's ballotCollection, set account first!")

    let price = BallotContract.price
    // Withdraw tokens from the signer's stored vault
    self.toSendVault <- vaultRef.withdraw(amount: price * UFix64(count))
  }

  execute {
    let receiveBallot <- BallotContract.buyBallots(amount: count, buyTokens: <- self.toSendVault)
    // add to self ballot collection
    self.ballotCollectionRef.save(ballots: <-receiveBallot)
  }
}
`
