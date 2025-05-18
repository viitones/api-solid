import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from 'generated/prisma/client';

interface CheckInUseCaseRequest {
  userId: string;
  gynId: string;
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gynId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new Error('User already checked in today');
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gynId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
