/* formulaire de contact */

import React, { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"

const MAX_MESSAGE_LENGTH = 2000

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage()

  /* etats des champs du formulaire */
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  /* etats lies aux retours */
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  /* etat du bouton */
  const [btnState, setBtnState] = useState<"idle" | "working" | "success">("idle")

  /* reset lorsque la langue change */
  useEffect(() => {
    setErrors([])
    setSuccess(false)
    setSubmitted(false)
    setBtnState("idle")
  }, [language])

  /* fonctions de validation */
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  const validatePhone = (p: string) => {
    if (!p) return true;
    return /^0\d{9}$/.test(p);
  }

  /* fonction si un champ a une erreur */
  const hasError = (field: string) => {
    if (!submitted) return false
    if (field === "name") return !name
    if (field === "email") return !email || !validateEmail(email)
    if (field === "phone") return !phone || !validatePhone(phone)
    if (field === "subject") return !subject
    if (field === "message") return !message || message.length > MAX_MESSAGE_LENGTH
    return false
  }

  /* recalcul des erreurs a chaque changement */
  useEffect(() => {
    if (!submitted) return
    const newErrors: string[] = []
    if (!name || !email || !subject || !message) newErrors.push(t("contact.fieldsRequired"))
    if (email && !validateEmail(email)) newErrors.push(t("contact.invalidEmail"))
    if (!validatePhone(phone)) newErrors.push(t("contact.invalidPhone"))
    if (message.length > MAX_MESSAGE_LENGTH) newErrors.push(t("contact.messageTooLong"))
    setErrors([...new Set(newErrors)])
  }, [name, email, phone, subject, message, submitted, t])

  /* backend contact */
  const API_URL: string = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

  /* gestion du clic sur envoyer */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const validationErrors: string[] = []

    /* validations avant envoi */
    if (!name || !email || !subject || !message) validationErrors.push(t("contact.fieldsRequired"))
    if (email && !validateEmail(email)) validationErrors.push(t("contact.invalidEmail"))
    if (!validatePhone(phone)) validationErrors.push(t("contact.invalidPhone"))
    if (message.length > MAX_MESSAGE_LENGTH) validationErrors.push(t("contact.messageTooLong"))

    /* si erreurs on arrete */
    if (validationErrors.length > 0) {
      setErrors([...new Set(validationErrors)])
      setBtnState("idle")
      return
    }

    /* lancement de l'animation du bouton */
    setBtnState("working")
    setErrors([])
    setSuccess(false)

    /* tentative denvoi au serveur */
    try {
      const response = await fetch(`${API_URL}/api/contact`, {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      const data = await response.json()

      /* si erreur renvoyee par le serveur */
      if (data.error) {
        setErrors([t("contact.sendError")])
        setBtnState("idle")
        return
      }

      /* effet visuel avant affichage du succes */
      setTimeout(() => {
        setBtnState("success")
        setSuccess(true)
        setName("")
        setEmail("")
        setPhone("")
        setSubject("")
        setMessage("")
        setSubmitted(false)
      }, 1500)
    } catch {
      /* si probleme serveur */
      setErrors([t("contact.sendError")])
      setBtnState("idle")
    }
  }

  return (
    <form role="form" onSubmit={handleSubmit} className="contact-form">

      {/* input nom */}
      <input
        type="text"
        placeholder={t("contact.name")}
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 40))}
        className={hasError("name") ? "error-input" : ""}
        aria-label={t("contact.name")}
        aria-required="true"
        aria-invalid={hasError("name")}
      />

      {/* input email */}
      <input
        type="text"
        placeholder={t("contact.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value.slice(0, 40))}
        className={hasError("email") ? "error-input" : ""}
        aria-label={t("contact.email")}
        aria-required="true"
        aria-invalid={hasError("email")}
      />

      {/* input telephone */}
      <input
        type="text"
        placeholder={t("contact.phone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 20))}
        className={hasError("phone") ? "error-input" : ""}
        aria-label={t("contact.phone")}
        aria-required="false"
        aria-invalid={hasError("phone")}
      />

      {/* input sujet */}
      <input
        type="text"
        placeholder={t("contact.subject")}
        value={subject}
        onChange={(e) => setSubject(e.target.value.slice(0, 40))}
        className={hasError("subject") ? "error-input" : ""}
        aria-label={t("contact.subject")}
        aria-required="true"
        aria-invalid={hasError("subject")}
      />

      {/* champ message */}
      <div className="textarea-wrapper">
        <textarea
          placeholder={t("contact.message")}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
          className={hasError("message") ? "error-input" : ""}
          aria-label={t("contact.message")}
          aria-required="true"
          aria-invalid={hasError("message")}
          spellCheck={true}
          lang={language === "fr" ? "fr" : "en"}
          autoCorrect="on"
          autoCapitalize="sentences"
        />
        <div aria-live="polite" className="char-counter">
          {message.length} / {MAX_MESSAGE_LENGTH}
        </div>
      </div>

      {/* bouton envoyer anime */}
      <div className="button-wrapper">
        {btnState !== "success" && (
          <button type="submit" className={`animated-submit-btn ${btnState}`}>
            {btnState === "idle" && t("contact.send")}
            {btnState === "working" && ""}
          </button>
        )}
      </div>

      {/* affichage des erreurs */}
      {errors.length > 0 && (
        <div className="error-msg-container show">
          {errors.map((err, i) => (
            <p key={i} className="error-msg">{err}</p>
          ))}
        </div>
      )}

      {/* message de succes */}
      {success && btnState === "success" && (
        <p className="success-msg show">{t("contact.sendSuccess")}</p>
      )}
    </form>
  )
}

export default ContactForm
