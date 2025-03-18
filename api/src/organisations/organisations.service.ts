import { Injectable } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organisation } from './entities/organisation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationRepository: Repository<Organisation>,
  ) {}

  createName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}'s Organisation`;
  }

  create(createOrganisationDto: CreateOrganisationDto) {
    const organisation = new Organisation();
    organisation.name = createOrganisationDto.name;

    return this.organisationRepository.save(createOrganisationDto);
  }

  findAll() {
    return `This action returns all organisations`;
  }

  findOne(id: number) {
    return this.organisationRepository.findOne({ where: { id } });
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
