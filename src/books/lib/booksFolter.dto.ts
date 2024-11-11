import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class BooksFilterDTO {
  @Transform(({ value }) => {
    const int = Number(value);
    return isNaN(int) || int < 1 ? 1 : int;
  })
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public pageNum: number;

  @Transform(({ value }) => {
    const int = Number(value);
    return isNaN(int) || int < 1 ? 12 : int;
  })
  @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
  public pageSize: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
  page: number;
}
