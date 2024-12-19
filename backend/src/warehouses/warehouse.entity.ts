import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isHazardous: boolean;
}
