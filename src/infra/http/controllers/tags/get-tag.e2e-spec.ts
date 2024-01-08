import request from 'supertest'
import { SpectatorFactory } from 'test/factories/make-spectator'
import { TagFactory } from 'test/factories/make-tag'

import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'

let prisma: PrismaService
let tagFactory: TagFactory
let spectatorFactory: SpectatorFactory
let jwt: JwtEncrypter

describe('Get Tag (E2E)', () => {
  beforeAll(async () => {
    prisma = new PrismaService()
    tagFactory = new TagFactory(prisma)
    spectatorFactory = new SpectatorFactory(prisma)
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /tags/:id', async () => {
    const spectator = await spectatorFactory.makePrismaSpectator()
    const tag = await tagFactory.makePrismaTag({
      authorId: spectator.id,
      name: 'Action',
    })

    const token = await jwt.encrypt({ sub: spectator.id.toString() })
    const tagId = tag.id.toString()

    const response = await request(app.server)
      .get(`/tags/${tagId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      tag: expect.objectContaining({
        name: 'Action',
      }),
    })
  })
})
