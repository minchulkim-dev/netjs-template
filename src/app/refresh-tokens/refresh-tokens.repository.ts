import {
  RefreshTokenDocument,
  RefreshToken,
} from './schema/refresh-token.schema';
import { EntityRepository } from 'src/common/repositories/entity.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class RefreshTokensRepository extends EntityRepository<RefreshTokenDocument> {
  constructor(
    @InjectModel(RefreshToken.name) userModel: Model<RefreshTokenDocument>,
  ) {
    super(userModel);
  }
}
