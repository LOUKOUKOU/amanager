import { PROFILE_TYPE } from 'src/profiles/entities/profile.entity';

export class CreateUserDto {
  organisationId?: number;
  organisationName?: string;
  email: string;
  lastName: string;
  password: string;
  username: string;
  type: PROFILE_TYPE;
}
