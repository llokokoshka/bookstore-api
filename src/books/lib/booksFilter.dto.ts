// import { Transform, Type } from 'class-transformer';
// import { IsArray, IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from 'class-validator';

// export enum SortOrder {
//   ASC = 'ASC',
//   DESC = 'DESC',
// }

// export class BooksFilterDTO {
//   @Type(() => Number)
//   @IsInt({ message: '"pageNum" should be an integer' })
//   @IsOptional() 
//   @Min(1, { message: '"pageNum" should be at least 1' })
//   public pageNum: number;

//   @Type(() => Number)
//   @IsInt({ message: '"pageSize" should be an integer' })
//   @IsOptional() 
//   @Min(1, { message: '"pageSize" should be at least 1' })
//   public pageSize: number;

//   // @IsOptional()
//   // public orderBy?: string;

//   // @IsEnum(SortOrder)
//   // @IsOptional()
//   // public sortOrder?: SortOrder = SortOrder.DESC;

//   // @IsOptional()
//   // @IsString()
//   // author?: string;

//   // @IsOptional()
//   // @IsArray()
//   // genres?: number[]; 
  
//   // @IsOptional()
//   // @IsNumber()
//   // @Min(0)
//   // minPrice?: number;

//   // @IsOptional()
//   // @IsNumber()
//   // @Max(10000)
//   // maxPrice?: number;
// }
