import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PROFILE_TYPE } from 'src/profiles/entities/profile.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { OrganisationsService } from 'src/organisations/organisations.service';
import { CreateAdminUserDto } from 'src/users/dto/create-user.dto';

export type SessionInfo = {
  access_token: string;
  username: string;
  displayName: string;
  profileId: string;
  organisationName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private profilesService: ProfilesService,
    private organisationsService: OrganisationsService,
  ) {}

  async register(createUserDto: CreateAdminUserDto): Promise<SessionInfo> {
    const createdUser = await this.usersService.create(createUserDto);

    const createdOrganization = await this.organisationsService.create({
      name:
        createUserDto.organisationName ||
        this.organisationsService.createName(createUserDto.username),
    });

    await this.profilesService.create({
      user: createdUser,
      type: PROFILE_TYPE.ADMIN,
      displayName: createUserDto.username,
      organisation: createdOrganization,
    });

    return await this.signIn(createUserDto.username, createUserDto.password);
  }

  async signIn(username: string, pass: string): Promise<SessionInfo> {
    const user = await this.usersService.findOneByUsername(username);
    const profile = user
      ? await this.profilesService.findOneByUser(user.id)
      : null;
    const organisation = profile
      ? await this.organisationsService.findOneByProfile(profile.id)
      : null;
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    if (!profile || !organisation) {
      throw new UnauthorizedException('Profile error.');
    }

    const payload = {
      sub: user.id,
      userId: user.id,
      username: user.username,
      profileId: profile.id,
      organisationName: organisation.name,
    };
    return {
      username: user.username,
      displayName: profile.displayName,
      organisationName: organisation.name,
      profileId: profile.profileId,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
