export class CreateClientDto {
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly number?: string;
    readonly address?: string;
    readonly location?: string;
    readonly email?: string;
    readonly contactInfo?: string;
  }