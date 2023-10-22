import fetch from 'node-fetch'
import { ProofClient, ProofService } from '@nextdotid/sdk'
import { EthereumAddress } from 'wallet.ts'
import { createKeyPiar, sign } from './keypair'

async function main() {
  const persona = createKeyPiar()
  const wallet = createKeyPiar()
  const { address } = EthereumAddress.from(Buffer.from(wallet.publicKey))
  const publicKey = '0x' + persona.publicKey.toString('hex')

  console.log('Wallet Address:', address)
  console.log('Persona Public Key:', publicKey)

  const service = new ProofService({
    client: ProofClient.development(fetch as unknown as typeof global.fetch),
    platform: 'ethereum',
    identity: address,
    public_key: publicKey,
  })

  // health check
  await service.health()

  // create proof
  const proof = await service.createProof({
    async onExtra(payload) {
      return {
        signature: await sign(payload, persona.privateKey),
        wallet_signature: await sign(payload, wallet.privateKey),
      }
    },
  })

  // verify the proof
  await proof.verify()

  // query all bindings
  const bindings = await service.allExistedBinding()

  console.log(JSON.stringify(bindings))
}

main()