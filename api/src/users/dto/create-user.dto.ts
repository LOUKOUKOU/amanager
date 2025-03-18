import { PROFILE_TYPE } from 'src/profiles/entities/profile.entity';

export class CreateUserDto {
  organisationId?: number;
  organisationName?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  type: PROFILE_TYPE;
}
