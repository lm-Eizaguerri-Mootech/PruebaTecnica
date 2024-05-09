import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsEmpty()
  online: boolean = false;

}