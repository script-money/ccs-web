import React, { useReducer } from 'react'
import { query } from '@onflow/fcl'
import { defaultReducer } from '../reducer/defaultReducer'
import { GET_PRICE } from '../flow/get-price.script'

export default function useBallotPrice() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  const getPrice = async () => {
    dispatch({ type: 'PROCESSING' })

    try {
      const response = await query({
        cadence: GET_PRICE
      })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  return {
    ...state,
    getPrice
  }
}
