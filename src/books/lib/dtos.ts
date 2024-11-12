import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

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

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}