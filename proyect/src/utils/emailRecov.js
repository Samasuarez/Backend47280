import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: null,
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

export const sendRecoveryEmail = (email, token) => {
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: email,
    subject: 'Recuperación de Contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${process.env.CLIENT_URL}/reset-password/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};
