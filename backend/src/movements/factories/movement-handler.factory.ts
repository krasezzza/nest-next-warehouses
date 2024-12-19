import { Injectable } from '@nestjs/common';
import { IMovementHandler } from '../interfaces/movement-handler.interface';
import { ImportMovementHandler } from '../handlers/import-movement.handler';
import { ExportMovementHandler } from '../handlers/export-movement.handler';

@Injectable()
export class MovementHandlerFactory {
  constructor(
    private readonly importHandler: ImportMovementHandler,
    private readonly exportHandler: ExportMovementHandler,
  ) {}

  getHandler(type: 'import' | 'export'): IMovementHandler {
    switch (type) {
      case 'import':
        return this.importHandler;
      case 'export':
        return this.exportHandler;
      default:
        throw new Error(`Unsupported movement type: ${type}`);
    }
  }
}
