import { KVClient, KVService } from '@nextdotid/sdk'
import fetch from 'node-fetch'
import { EthereumAddress } from 'wallet.ts'
import { createKeyPiar, sign } from './keypair'

async function main() {
  const persona = createKeyPiar()
  const { address } = EthereumAddress.from(Buffer.from(persona.publicKey))
  const publicKey = '0x' + persona.publicKey.toString('hex')

  console.log('Persona Address:', address)
  console.log('Persona Public Key:', publicKey)

  const service = new KVService({
    client: KVClient.development(fetch as unknown as typeof global.fetch),
    platform: 'ethereum',
    identity: address,
    persona: publicKey,
  })

  const patch = {
    ['pluginId']: 'example data',
  }

  // set with proof
  await service.set(patch, {
    onSignature(payload) {
      return sign(payload, persona.privateKey)
    },
  })

  // get all proofs
  const { proofs } = await service.get()

  console.log(proofs)
}

main()