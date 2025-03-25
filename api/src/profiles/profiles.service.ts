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
    profile.displayName = createProfileDto.displayName;
    profile.user = createProfileDto.user;
    profile.organisation = createProfileDto.organisation;

    return this.profileRepository.save(profile);
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: string) {
    return this.profileRepository.findOne({
      where: { profileId: id },
    });
  }

  findOneByUser(id: number) {
    return this.profileRepository.findOne({
      where: { user: { id } },
    });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
