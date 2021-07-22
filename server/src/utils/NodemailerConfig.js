import nodemailer from 'nodemailer';

import 'dotenv/config';

export default async function NodemailerConfig(email, token) {
    let link = `http://localhost:3000/resetPassword/${token}`;

    let transport = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user:  process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    let emailInfo = await transport.sendMail({
        from: "quizon@app.com",
        to: email,
        subject: "QuizOn - Password recovery",
        text: `QuizOn: Recebemos a solicitação de troca de senha, então aqui está o link, basta clicar nele e colocar a nova senha: ${link}`,
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial;
                        }

                        .div-header {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: #2480D6;
                            width: 100vw;
                            height: 150px;
                        }

                        .div-title {
                            color: #FFF;
                            font-size: 72px
                        }
                    </style>
                </head>
                <body>
                    <div class="div-header">
                        <h1 class="div-title">QuizOn</h1>
                    </div>

                    <h1>Alteração de senha</h1>

                    <p>Olá, tudo bem? Recebemos a solicitação de troca de senha, então aqui está o link, basta clicar nele e colocar a nova senha.</p>
                    <a href="${link}">${link}<a>
                    <p><strong>PS:</strong> Lembre-se de colocar uma senha forte, misturando números, letras e símbolos ;)</p>
                </body>
            </html>
        `,
    });

    return emailInfo;
}