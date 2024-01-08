import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hash')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hash') === hash
  }
}