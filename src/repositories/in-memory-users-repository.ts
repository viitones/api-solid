import { prisma } from '@/lib/prisma';
import { Prisma } from 'generated/prisma';

export class inMemoryUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
