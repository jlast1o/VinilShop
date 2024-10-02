// shipment.service.ts
import { Injectable } from '@nestjs/common';
import { Shipment } from './entities/shipment.entity';
import { PrismaService } from 'src/prisma.service';
import { ShipmentCreateDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(private readonly prisma: PrismaService) {}

  createShipment(shipmentData: ShipmentCreateDto) {
    const { name, ruProductId, euProductId } = shipmentData;
  
    if (ruProductId && euProductId) {
      throw new Error('A shipment can only be associated with one product');
    }
  
    const shipment = this.prisma.shipment.create({
      data: {
        name,
        ruProduct: ruProductId ? { connect: { id: ruProductId } } : undefined,
        euProduct: euProductId ? { connect: { id: euProductId } } : undefined,
      },
    });
  
    return shipment;
  }
  

  getAllShipments() {
    return this.prisma.shipment.findMany();
  }

  getShipment(id: number) {
    return this.prisma.shipment.findUnique({ where: { shipmentId : id } });
  }

  deleteShipment(id: number) {
    return this.prisma.shipment.delete({ where: { shipmentId : id } });
  }
}
