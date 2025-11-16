import { Router } from "express";
import sgMail from "@sendgrid/mail";

const router = Router();

/* configuration de SendGrid avec la clé API */
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/* route POST pour l’envoi du formulaire de contact */
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  /* validation des champs requis */
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  /* limite de longueur du message */
  if (message.length > 2000) {
    return res.status(400).json({ error: "Le message ne peut pas dépasser 2000 caractères." });
  }

  /* récupération de l'email destinataire */
  const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER;
  if (!CONTACT_RECEIVER) return res.status(500).json({ error: "Erreur configuration serveur" });

  try {
    /* envoi du mail via SendGrid */
    await sgMail.send({
      to: CONTACT_RECEIVER,
      from: CONTACT_RECEIVER,
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

    res.json({ success: true });
  } catch (err) {
    console.error("Erreur SendGrid:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
});

export default router;
