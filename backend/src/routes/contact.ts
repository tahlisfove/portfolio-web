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
    /* envoi du mail */
    await sgMail.send({
      to: CONTACT_RECEIVER,
      from: CONTACT_RECEIVER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4A90E2;">📩 Nouveau message depuis ton portfolio</h2>

          <p>Tu as reçu un nouveau message via ton formulaire de contact :</p>

          <div style="margin-top: 20px; padding: 15px; background: #f7f7f7; border-radius: 8px;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
          </div>

          <h3 style="margin-top: 30px;">💬 Message :</h3>
          <p style="white-space: pre-line; line-height: 1.6;">
            ${message}
          </p>

          <hr style="margin-top: 30px;">
          <p style="font-size: 12px; color: #999;">
            Email envoyé automatiquement depuis ton portfolio.
          </p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Erreur SendGrid:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
});

export default router;
