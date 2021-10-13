export const VOTE = `
import ActivityContract from 0xActivityContract
import FungibleToken from 0xFungibleToken
import BallotContract from 0xBallotContract
import CCSToken from 0xCCSToken

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
