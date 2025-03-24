import { Body, Controller, Get, Post } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface SendEmailData {
  name: string;
  address: string;
  phone: string;
  message: string;
}

@Controller('mail')
export class MailController {
  @Post()
  async sendMail(@Body() body: SendEmailData) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = {
      address: process.env.SMTP_FROM_ADDRESS,
      name: process.env.SMTP_FROM_NAME,
    };

    try {
      await transporter.sendMail({
        from,
        to: [from, { address: body.address, name: body.name }],
        subject: 'Votre demande de devis',
        text: `
          Nom: ${body.name}
          Email: ${body.address}
          Téléphone: ${body.phone}
          Message: ${body.message}
        `,
      });

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’email :', error);
      return { success: false, error: error.message };
    }
  }

  @Get()
  findAll() {
    return { success: false };
  }
}
