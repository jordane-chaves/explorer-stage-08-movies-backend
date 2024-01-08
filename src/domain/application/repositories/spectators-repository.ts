import { Spectator } from '@/domain/enterprise/entities/spectator'

export interface SpectatorsRepository {
  findByEmail(email: string): Promise<Spectator | null>
  create(spectator: Spectator): Promise<void>
}
