export const GET_CREATE_CONSUMPTION = `
import ActivityContract from 0xActivityContract

pub fun main(): UFix64 {
  return ActivityContract.getCreateConsumption()
}
`
