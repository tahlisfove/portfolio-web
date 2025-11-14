import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

/* route post pour l’envoi du formulaire de contact */
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  /* validation des champs requis */
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  /* limite de longueur du message */
  if (message.length > 2000) {
    return res
      .status(400)
      .json({ error: "Le message ne peut pas dépasser 2000 caractères." });
  }

  /* vérification de la configuration smtp */
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_RECEIVER) {
    return res.status(500).json({ error: "Erreur de configuration du serveur" });
  }

  try {
    /* configuration du transporteur smtp */
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
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

Message:${message}
`,
    });

    /* réponse en cas de succès */
    res.json({ success: true });
  } catch {
    /* erreur d’envoi du mail */
    res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
});

export default router;
