import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength} from "class-validator";

export class NewCategoryDTO {    
    @ApiProperty({
        example: 'Category Name',
        description: 'Name of the new category',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string

}






