import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OrganisationsService } from 'src/organisations/organisations.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { PROFILE_TYPE } from 'src/profiles/entities/profile.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly organisationsService: OrganisationsService,
    private readonly profilesService: ProfilesService,
  ) {}

  /**
   * **Admin**
   * create user ⇒ create profile ⇒ create organisation ⇒ link profile to organisation
   *
   * **Supervisor or developer**
   * create user ⇒ create profile  ⇒ fetch organisation ⇒ link profile to organisation
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newOrganisation =
      createUserDto.type == PROFILE_TYPE.ADMIN && !createUserDto.organisationId;

    const createdUser = await this.usersService.create(createUserDto);

    const newProfile = await this.profilesService.createUserProfile(
      createdUser,
      createUserDto.type,
    );

    const createdOrganization =
      // The !createUserDto.organisationId is just to shut up the linter
      newOrganisation || !createUserDto.organisationId
        ? await this.organisationsService.create({
            name:
              createUserDto.organisationName ||
              this.organisationsService.createName(
                createUserDto.firstName,
                createUserDto.lastName,
              ),
          })
        : await this.organisationsService.findOne(createUserDto.organisationId);

    this.profilesService.update(newProfile.id, {
      organisations: createdOrganization ? [createdOrganization] : [],
      projects: createdOrganization?.projects || [],
      tasks: [],
    });

    return createdUser;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
