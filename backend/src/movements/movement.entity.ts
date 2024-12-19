import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  warehouseId: number;

  @Column()
  productId: number;

  @Column()
  amount: number;

  @Column()
  type: 'import' | 'export';

  @Column()
  timestamp: number;
}
