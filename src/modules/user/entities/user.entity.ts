import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcrypt";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

@Entity()
export class User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column({unique: true})
  username: string;

  @Column()
  hashedPassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEmail()
  @Column({
    nullable: true,
  })
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Column({default: true})
  isActive?: boolean;

  async comparePassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.hashedPassword);

    return isMatch;
  }

  async savePassword(password: string): Promise<void> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    this.hashedPassword = hash;
  }
}
