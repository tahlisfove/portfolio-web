import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

const MAX_MESSAGE_LENGTH = 2000;

const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  /* états des champs du formulaire */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  /* états succès et d'erreurs */
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  /* reset des messages au changement de langue */
  useEffect(() => {
    setErrors([]);
    setSuccess(false);
    setSubmitted(false);
  }, [language]);

  /* validation d'email */
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* validation des champs */
  useEffect(() => {
    if (!submitted) return;
    const newErrors: string[] = [];
    if (!name || !email || !subject || !message) newErrors.push(t("contact.fieldsRequired"));
    if (email && !validateEmail(email)) newErrors.push(t("contact.invalidEmail"));
    if (message.length > MAX_MESSAGE_LENGTH) newErrors.push(t("contact.messageTooLong"));
    setErrors([...new Set(newErrors)]);
  }, [name, email, subject, message, submitted, t]);

  /* vérifie si un champ a une erreur */
  const hasError = (field: string) => {
    if (!submitted) return false;
    if (field === "name") return !name;
    if (field === "email") return !email || (email && !validateEmail(email));
    if (field === "subject") return !subject;
    if (field === "message") return !message || message.length > MAX_MESSAGE_LENGTH;
    return false;
  };

  /* gestion de l'envoi du formulaire */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors: string[] = [];
    if (!name || !email || !subject || !message) newErrors.push(t("contact.fieldsRequired"));
    if (email && !validateEmail(email)) newErrors.push(t("contact.invalidEmail"));
    if (message.length > MAX_MESSAGE_LENGTH) newErrors.push(t("contact.messageTooLong"));

    if (newErrors.length > 0) {
      setErrors([...new Set(newErrors)]);
      setSuccess(false);
      return;
    }

    try {
      /* envoi du formulaire via l'API */
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await response.json();

      if (data.error) {
        setErrors([t("contact.sendError")]);
        setSuccess(false);
        return;
      }

      /* réinitialisation du formulaire en cas de succès */
      setSuccess(true);
      setErrors([]);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitted(false);
    } catch {
      setErrors([t("contact.sendError")]);
      setSuccess(false);
    }
  };

  return (
    <div className="contact-page">
      {/* section d'introduction */}
      <section className="contact-intro">
        <h1>{t("nav.contact")}</h1>
        <p>{t("contact.intro")}</p>

        {/* boutons externes */}
        <div className="contact-buttons">
          <a
            href="https://www.linkedin.com/in/samuelchristoph/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn linkedin-btn"
          >
            linkedin
          </a>

          <a href="/ChristophSamuel_CV.pdf" download className="btn cv-btn">
            {t("contact.cv")}
          </a>
        </div>
      </section>

      {/* formulaire de contact */}
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>{t("contact.formTitle")}</h2>

        <input
          type="text"
          placeholder={t("contact.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={hasError("name") ? "error-input" : ""}
        />

        <input
          type="text"
          placeholder={t("contact.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={hasError("email") ? "error-input" : ""}
        />

        <input
          type="text"
          placeholder={t("contact.subject")}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={hasError("subject") ? "error-input" : ""}
        />

        {/* zone de texte pour le message */}
        <div className="textarea-wrapper">
          <textarea
            placeholder={t("contact.message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            className={hasError("message") ? "error-input" : ""}
          />
          <div className="char-counter">
            {message.length} / {MAX_MESSAGE_LENGTH}
          </div>
        </div>

        <button type="submit">{t("contact.send")}</button>

        {/* affichage des erreurs */}
        {submitted && errors.length > 0 && (
          <div className="error-msg-container">
            {errors.map((err, index) => (
              <p key={index} className="error-msg">
                {err}
              </p>
            ))}
          </div>
        )}

        {/* message de succès */}
        {success && <p className="success-msg">{t("contact.sendSuccess")}</p>}
      </form>
    </div>
  );
};

export default Contact;
