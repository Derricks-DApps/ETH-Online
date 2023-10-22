import { randomBytes } from 'crypto'
import { HDKey } from 'wallet.ts'
import { ecsign, toRpcSig, keccakFromString } from 'ethereumjs-util'

export function createKeyPiar() {
  const seed = randomBytes(66)
  return HDKey.parseMasterSeed(seed).derive('')
}

export async function sign(message: string, privateKey: Buffer | null) {
  if (privateKey === null) throw new Error('Failed to sign.')
  message = `\x19Ethereum Signed Message:\n${message.length}${message}`
  const messageHash = keccakFromString(message, 256)
  const signature = ecsign(messageHash, privateKey)
  const signed = toRpcSig(signature.v, signature.r, signature.s).slice(2)
  return Buffer.from(signed, 'hex').toString('base64')
}