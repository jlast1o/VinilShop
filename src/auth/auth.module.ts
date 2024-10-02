import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientService } from 'src/client/client.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ClientService],
  exports: [AuthService]
})
export class AuthModule {}
