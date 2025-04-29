import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'email@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
    });

    expect(() =>
      sut.execute({
        email: 'email@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
