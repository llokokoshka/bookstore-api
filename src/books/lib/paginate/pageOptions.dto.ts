import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export class PageOptionsDto {
  @IsOptional()
  @IsEnum(Order)
  readonly order?: Order = Order.ASC;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  readonly take?: number = 12;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map(Number) : value), { toClassOnly: true })
  @IsArray()
  genres?: number[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Max(10000)
  maxPrice?: number;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}