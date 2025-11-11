import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

// limite maximale du message
const MAX_MESSAGE_LENGTH = 2000;

const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  // états du formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // états de retour (succès / erreur)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldsWithError, setFieldsWithError] = useState<string[]>([]);

  // réinitialisation des messages quand on change de langue
  useEffect(() => {
    setError("");
    setSuccess(false);
    setFieldsWithError([]);
  }, [language]);

  // fonction validation d'email
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFieldsWithError: string[] = [];

    // vérification des champs obligatoires
    if (!name) newFieldsWithError.push("name");
    if (!email) newFieldsWithError.push("email");
    if (!subject) newFieldsWithError.push("subject");
    if (!message) newFieldsWithError.push("message");

    // validation email
    const emailInvalid = email && !validateEmail(email);

    // message si un ou plusieurs champs sont vides
    if (newFieldsWithError.length > 0) {
      setError(t("fieldsRequired"));
      setFieldsWithError(newFieldsWithError);
      setSuccess(false);
      return;
    }

    // message si email invalide
    if (emailInvalid) {
      setError(t("invalidEmail"));
      setFieldsWithError(["email"]);
      setSuccess(false);
      return;
    }

    // message trop long
    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(t(`Le message ne peut pas dépasser ${MAX_MESSAGE_LENGTH} caractères.`));
      setFieldsWithError(["message"]);
      setSuccess(false);
      return;
    }

    // envoi des données au backend
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (data.error) {
        setError(t("sendError"));
        setSuccess(false);
        return;
      }

      // si tout est bon : réinitialiser le formulaire
      setSuccess(true);
      setError("");
      setFieldsWithError([]);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError(t("sendError"));
      setSuccess(false);
    }
  };

  // pour savoir si un champ est en erreur
  const hasError = (field: string) => fieldsWithError.includes(field);

  return (
    <div className="contact-page">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>{t("contact")}</h2>

        {/* champ nom */}
        <input
          type="text"
          placeholder={t("Nom *")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={hasError("name") ? "error-input" : ""}
        />

        {/* champ email */}
        <input
          type="text"
          placeholder={t("Email *")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={hasError("email") ? "error-input" : ""}
        />

        {/* champ sujet */}
        <input
          type="text"
          placeholder={t("Sujet *")}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={hasError("subject") ? "error-input" : ""}
        />

        {/* champ message */}
        <div className="textarea-wrapper">
          <textarea
            placeholder={t("Message *")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            className={hasError("message") ? "error-input" : ""}
          />
          <div className="char-counter">
            {message.length} / {MAX_MESSAGE_LENGTH}
          </div>
        </div>

        {/* bouton d’envoi */}
        <button type="submit">{t("Envoyer")}</button>

        {/* messages de retour */}
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{t("sendSuccess")}</p>}
      </form>
    </div>
  );
};

export default Contact;
