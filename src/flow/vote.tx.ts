export const VOTE = `
import ActivityContract from Project.ActivityContract
import FungibleToken from Flow.FungibleToken
import BallotContract from Project.BallotContract
import CCSToken from Project.CCSToken

transaction(activityId: UInt64, isUpVote: Bool) {

  var sendBollet: @BallotContract.Ballot
  var voter: Address

  prepare(signer: AuthAccount) {
    let collectionRef = signer.borrow<&BallotContract.Collection>(from: BallotContract.CollectionStoragePath)
      ?? panic("Could not borrow reference to the owner's ballot collection!")
    self.voter = signer.address
    self.sendBollet <- collectionRef.borrow()
  }

  execute {
    ActivityContract.vote(ballot: <-self.sendBollet, voter: self.voter, activityId: activityId, isUpVote: isUpVote)
  }
}
`
