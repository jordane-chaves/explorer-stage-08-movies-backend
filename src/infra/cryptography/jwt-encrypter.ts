import { Encrypter } from '@/domain/application/cryptography/encrypter'

import { app } from '../app'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return app.jwt.sign(payload)
  }
}
