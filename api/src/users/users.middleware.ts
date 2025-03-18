import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PROFILE_TYPE } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { OrganisationsService } from 'src/organisations/organisations.service';

@Injectable()
export class UsersMiddleWare implements NestMiddleware {
  constructor(
    @Inject()
    private readonly organisationService: OrganisationsService,
  ) {}

  async handlePostExceptions(createUserDto: CreateUserDto) {
    let throwCallback = () => {};
    if (
      createUserDto.type == PROFILE_TYPE.ADMIN &&
      createUserDto.organisationId
    ) {
      throw new Error('Admins user already exists.');
    }

    if (
      createUserDto.type != PROFILE_TYPE.ADMIN &&
      !createUserDto.organisationId
    ) {
      throw new Error('No organisation has been assigned to user.');
    } else if (createUserDto.organisationId) {
      const organisation = await this.organisationService.findOne(
        createUserDto.organisationId,
      );
      throw new Error("Organization doesn't exist.");
    }

    throw new Error('Organisation doesn’t belong to user.');
    // else {
    //   }
    // else {
    //   }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method == 'POST') {
        // this.handlePostExceptions(req.body);
      }
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ message: 'Organisation Error' });
    }
  }
}
