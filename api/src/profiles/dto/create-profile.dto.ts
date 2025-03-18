import { PROFILE_TYPE } from '../entities/profile.entity';

export class CreateProfileDto {
  userId: number;
  type: PROFILE_TYPE;
}
