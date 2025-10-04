import nodemailer from 'nodemailer';

export class EmailSenderService {
    private transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: 'your@email.com',
            pass: 'your-password',
        },
    });

    async send(to: string, subject: string, body: string): Promise<void> {
        await this.transporter.sendMail({
            from: '"App Name" <your@email.com>',
            to,
            subject,
            html: body,
        });
    }
}
