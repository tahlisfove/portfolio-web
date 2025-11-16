import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

/* route POST pour l’envoi du formulaire */
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  /* validation des champs requis */
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  if (message.length > 2000) {
    return res
      .status(400)
      .json({ error: "Le message ne peut pas dépasser 2000 caractères." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_RECEIVER) {
    return res.status(500).json({ error: "Erreur de configuration du serveur" });
  }

  try {
    /* configuration SMTP */
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    /* envoi du mail */
    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: CONTACT_RECEIVER,
      subject: `[Portfolio] ${subject}`,
      text: `
Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Sujet: ${subject}

Message:
${message}
      `,
    });

    /* succès */
    res.json({ success: true });
  } catch (err: any) {
    console.error("Erreur Nodemailer:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
});

export default router;
