// import { Inject } from "@tsed/common";
// import { Identifiable } from "../data/type/identifiable";
// import { DataRepository } from "../data/repository/repository";

// export abstract class BaseService<T extends Identifiable> implements DataRepository<T extends Identifiable>{
//   async findAll(filterCriteria: FilterCriteria): Promise<PaginationResult<T>> {
//     return this.handleFindAll(filterCriteria);
//   }

//   async findById(id: string): Promise<T | null> {
//     return this.getRepository().findOneBy({ id } as FindOptionsWhere<T>);
//   }

//   async save(entity: T): Promise<T> {
//     return this.getRepository().save(entity);
//   }

//   async saveAll(entities: T[]): Promise<T[]> {
//     return this.getRepository().save(entities);
//   }

//   async update(entity: T): Promise<T & Partial<T>> {
//     const existing = await this.findById(entity.id);
//     if (existing === null) {
//       throw new Error("Failed to update entity");
//     }

//     const updateEntity = _.omit(entity, NON_TRANSIENT_FIELDS);

//     return this.getRepository().save(
//       _.mergeWith(
//         {},
//         existing,
//         updateEntity,
//         (_objValue: unknown, srcValue: unknown, key: string) => {
//           // Handles merge for number arrays
//           // Check if both srcValue and _objValue are number arrays or empty
//           const isSrcValueNumArray =
//             _.isArray(srcValue) &&
//             (_.isEmpty(srcValue) || _.every(srcValue, _.isNumber));
//           const isObjValueNumArray =
//             _.isArray(_objValue) &&
//             (_.isEmpty(_objValue) || _.every(_objValue, _.isNumber));
//           // don't merge meta blobs
//           if (key === "meta" || (isSrcValueNumArray && isObjValueNumArray)) {
//             return srcValue;
//           }
//         }
//       )
//     );
//   }
// }
