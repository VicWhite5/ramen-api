import { Type } from "class-transformer";
import { IsArray, IsIn, IsInt, IsPositive, IsString, Min, MinLength, ValidateNested } from "class-validator";

export class CreateRamanDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    price: number;

    @IsInt()
    @IsIn([1, 2 ,3 ,4 , 5])
    spice_level: number;

    // @IsArray()
    // @ValidateNested({each: true})
    // @Type(() => String)
    @IsArray()
    ingredients: string[]
}
