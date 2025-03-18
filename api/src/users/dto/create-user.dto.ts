import { Profile } from 'src/profiles/entities/profile.entity';

/**
 * Users are linked to profiles when the profile is made
 */
export class CreateUserDto {
  email: string;
  password: string;
  username: string;
}

export class CreateAdminUserDto extends CreateUserDto {
  organisationName: string;
}
