export const GET_PRICE = `
import BallotContract from 0xBallotContract

pub fun main(): UFix64 {    
  return BallotContract.price
}
`
