import { Controller, Post } from '@nestjs/common';

@Controller('mail')
export class MailController {
  @Post()
  findAll() {
    return { success: 'false' };
  }
}
