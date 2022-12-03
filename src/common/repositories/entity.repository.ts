import { AnyBulkWriteOperation } from 'mongodb';
import {
  Callback,
  Document,
  FilterQuery,
  Model,
  MongooseBulkWriteOptions,
  QueryOptions,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions,
    callback?: Callback,
  ) {
    return this.entityModel.findOne(
      entityFilterQuery,
      {
        ...projection,
      },
      options,
      callback,
    );
  }

  find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions,
    callback?: Callback,
  ) {
    return this.entityModel.find(
      entityFilterQuery,
      {
        ...projection,
      },
      options,
      callback,
    );
  }

  async create(createEntityData?: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: unknown,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true },
    );
  }

  async bulkWrite(
    writes: AnyBulkWriteOperation<any>[],
    options?: MongooseBulkWriteOptions,
  ) {
    return await this.entityModel.bulkWrite(writes, options);
  }
}
