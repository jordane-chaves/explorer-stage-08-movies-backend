import { SpectatorsRepository } from '@/domain/application/repositories/spectators-repository'
import { Spectator } from '@/domain/enterprise/entities/spectator'

import { InMemorySpectatorAvatarsRepository } from './in-memory-spectator-avatars-repository'

export class InMemorySpectatorsRepository implements SpectatorsRepository {
  public items: Spectator[] = []

  constructor(
    private spectatorAvatarsRepository: InMemorySpectatorAvatarsRepository,
  ) {}

  async findByEmail(email: string): Promise<Spectator | null> {
    const spectator = this.items.find((item) => item.email === email)

    if (!spectator) {
      return null
    }

    return spectator
  }

  async create(spectator: Spectator): Promise<void> {
    this.items.push(spectator)

    if (spectator.avatar) {
      await this.spectatorAvatarsRepository.create(spectator.avatar)
    }
  }
}
