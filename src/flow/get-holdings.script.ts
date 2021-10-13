export const GET_HODINGS = `
import FungibleToken from 0xFungibleToken
import BallotContract from 0xBallotContract

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let ballotCollectionRef = account.getCapability(BallotContract.CollectionPublicPath)
      .borrow<&BallotContract.Collection{BallotContract.CollectionPublic}>()
      ?? panic("Could not borrow BallotContract Collection reference")

    return ballotCollectionRef.getAmount()
}
`
