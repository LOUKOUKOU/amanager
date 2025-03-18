import { Organisation } from 'src/organisations/entities/organisation.entity';
import { PROFILE_TYPE } from '../entities/profile.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateProfileDto {
  type: PROFILE_TYPE;
  displayName: string;
  organisation: Organisation;
  user: User;
}
