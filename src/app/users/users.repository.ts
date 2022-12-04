import { UserDocument, User } from './schema/user.schema';
import { EntityRepository } from 'src/common/repositories/entity.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
