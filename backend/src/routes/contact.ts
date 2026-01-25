import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

/* transporteur Nodemailer avec SMTP SSL*/
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
});

/* route POST pour l’envoi du formulaire de contact */
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  /* validation des champs requis */
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  /* validation du numéro de téléphone français uniquement */
  const phoneRegexFR = /^0\d{9}$/;
  if (phone && !phoneRegexFR.test(phone)) {
    return res.status(400).json({ error: "Numéro de téléphone invalide (FR uniquement)" });
  }

  /* limite de longueur du message */
  if (message.length > 2000) {
    return res.status(400).json({ error: "Le message ne peut pas dépasser 2000 caractères." });
  }

  /* récupération de l'email destinataire */
  const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER;
  const GMAIL_USER = process.env.GMAIL_USER;

  if (!CONTACT_RECEIVER || !GMAIL_USER) {
    return res.status(500).json({ error: "Erreur configuration serveur" });
  }

  try {
    /* envoi du mail */
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: CONTACT_RECEIVER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="margin-top: 0;">Nouveau message</h2>

          <div style="margin-top: 30px; padding: 15px; background: #f7f7f7; border-radius: 8px;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
          </div>

          <h3 style="margin-top: 20px;">Message :</h3>
          <p style="line-height: 1.6;">
            ${message}
          </p>

          <hr style="margin-top: 30px;">
          <p style="font-size: 12px; color: #999;">
            Email envoyé automatiquement depuis mon portfolio.
          </p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err: any) {
    console.error("Erreur Nodemailer:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
});

export default router;
