import { Router } from "express";
import emailjs from "emailjs-com";

const router = Router();

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

  /* récupération des IDs EmailJS depuis les variables d'environnement */
  const SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return res.status(500).json({ error: "Erreur configuration serveur" });
  }

  try {
    /* envoi du mail via EmailJS */
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      name,
      email,
      phone: phone || "Non renseigné",
      subject,
      message,
      time: new Date().toLocaleString("fr-FR")
    }, PUBLIC_KEY);

    res.json({ success: true });
  } catch (err: any) {
    console.error("Erreur EmailJS:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
});

export default router;
