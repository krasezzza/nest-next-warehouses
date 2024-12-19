import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  warehouseId: number;

  @Column()
  maxCapacity: number;

  @Column()
  usedCapacity: number;
}
