import { Injectable } from '@nestjs/common';

import { Maybe } from '../../../../../shared-kernel/domain/maybe';
import { UniqueId } from '../../../../../shared-kernel/domain/unique-id.value-object';
import { TransactionContext } from '../../../../../shared-kernel/infrastructure/event-bus/event-handler.port';
import { PrismaService } from '../../../../../shared-kernel/infrastructure/prisma/prisma.service';
import { UserProfileRepositoryPort } from '../../../application/ports/output/user-profile.repository.port';
import { UserProfile } from '../../../domain/aggregates/user-profile.aggregate';
import { UserProfileMapper } from './mappers/user-profile.mapper';

@Injectable()
export class UserProfilePrismaRepositoryAdapter implements UserProfileRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueId, tx?: TransactionContext): Promise<Maybe<UserProfile>> {
    const client = tx ?? this.prisma;
    const model = await client.userProfile.findUnique({
      where: { id: id.value },
    });

    if (model === null) {
      return Maybe.none<UserProfile>();
    }

    return Maybe.some(UserProfileMapper.toDomain(model));
  }

  async save(userProfile: UserProfile, tx?: TransactionContext): Promise<void> {
    const client = tx ?? this.prisma;
    const data = UserProfileMapper.toPersistence(userProfile);

    await client.userProfile.upsert({
      where: { id: userProfile.id.value },
      create: data,
      update: data,
    });
  }
}
