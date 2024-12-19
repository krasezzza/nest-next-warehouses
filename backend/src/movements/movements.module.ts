import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './movement.entity';
import { StocksModule } from '../stocks/stocks.module';
import { MovementHandlerFactory } from './factories/movement-handler.factory';
import { ImportMovementHandler } from './handlers/import-movement.handler';
import { ExportMovementHandler } from './handlers/export-movement.handler';
import { MovementValidationModule } from '../movement-validation/movement-validation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movement]),
    StocksModule,
    MovementValidationModule,
  ],
  providers: [
    MovementsService,
    MovementHandlerFactory,
    ImportMovementHandler,
    ExportMovementHandler,
  ],
  exports: [MovementsService],
  controllers: [MovementsController]
})
export class MovementsModule {}
