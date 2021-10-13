import { createContext, useContext, useEffect, useState } from 'react'
import { send, getTransactionStatus, decode, tx } from '@onflow/fcl'
import React from 'react'

type txType = { id: string }

interface ITxContext {
  runningTxs: boolean
  addTx?: (txID: string) => void
}

export const TxContext = createContext<ITxContext>({
  runningTxs: false
})

export const TxsProvider = ({ children }: { children: React.ReactNode }) => {
  const [txs, setTxs] = useState<txType[]>([])
  const [loading, setLoading] = useState(true)

  const getLocalTxs = async () => {
    const txString = window.localStorage.getItem('txs')

    if (!txString || txString.length === 0) {
      setLoading(false)
      return
    }

    const localTxs = txString?.split(',')
    const runningTxs = []

    for (let index = 0; index < localTxs.length; index++) {
      const id = localTxs[index]
      const t = await getTxStatus(id)
      if (t?.status === 4) {
        continue
      }
      tx(id).subscribe((s: any) => updateTxStatus(s?.status, id))
      runningTxs.push(id)
    }

    localStorage.setItem('txs', runningTxs.toString())
    setTxs(runningTxs.map(t => ({ id: t })))
    setLoading(false)
  }

  const addTx = (txID: string) => {
    const transaction = { id: txID }
    setTxs(prev => [...prev, transaction])
    tx(txID).subscribe((s: any) => updateTxStatus(s?.status, transaction?.id))
    window.localStorage.setItem('txs', [...txs, transaction?.id].toString())
  }

  const updateTxStatus = (status: number, txID: string) => {
    if (status === 4) {
      removeTx(txID)
      return
    }
    const tx = txs.find(t => t.id === txID)
    const oldTxs = txs.filter(t => t.id !== txID)
    if (!tx) return
    const updatedTx = { ...tx, status }
    setTxs([...oldTxs, updatedTx])
  }

  const removeTx = (txID: string) => {
    const newTxs = txs.filter(t => t.id !== txID)
    setTxs(newTxs)
  }

  const getTxStatus = async (txID: string) => {
    const status = await send([getTransactionStatus(txID)]).then(decode)
    return status
  }

  return (
    <TxContext.Provider
      value={{
        runningTxs: txs.length !== 0,
        addTx
      }}
    >
      {children}
    </TxContext.Provider>
  )
}

export const useTxs = () => {
  return useContext(TxContext)
}
