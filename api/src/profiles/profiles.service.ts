import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, PROFILE_TYPE } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = new Profile();
    profile.type = createProfileDto.type;

    return this.profileRepository.save(profile);
  }

  async createUserProfile(
    user: User,
    // organisation: Organisation,
    type: PROFILE_TYPE,
  ) {
    const profile = new Profile();
    profile.user = user;
    profile.type = type;
    // profile.organisations = [organisation];
    // profile.projects = organisation.projects;

    return this.profileRepository.save(profile);
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
