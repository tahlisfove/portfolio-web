# Portfolio Web – Samuel Christoph

Bienvenue sur le dépôt du site **www.samuel-christoph.fr**, mon portfolio et CV en ligne.  
Ce projet me présente rapidement, mes compétences et mes réalisations à travers une interface moderne, responsive et accessible.

## À propos du site

Ce portfolio a été conçu pour offrir une expérience claire et professionnelle :

- **Responsive** : compatible mobile, tablette et desktop  
- **Accessible** : navigation clavier, contrastes vérifiés, compatible lecteurs d'écran  
- **Multilingue** : français (par défaut) / anglais  
- **Performant** : chargement rapide, transitions fluides  
- **Sécurisé** : API isolée, variables d’environnement, protection anti-spam  

Fonctionnalités principales :
- Présentation personnelle
- CV téléchargeables en français et anglais
- Liste de projets récupérée dynamiquement depuis une base PostgreSQL
- Formulaire de contact fonctionnel (envoi via SendGrid)

## Technologies principales

### Frontend
- React + TypeScript (Vite)
- i18n JSON pour le multilingue
- Composants UI réutilisables (Header, Footer, ProjectCard, Form...)

### Backend
- Node.js + Express + TypeScript  
- PostgreSQL + Prisma ORM  
- API dédiée aux projets  
- Route de contact sécurisée (rate limiting + SendGrid)

### Hébergement & services
- **Frontend : Vercel**  
- **Backend : Render**  
- **Base de données : PostgreSQL Render**  
- **Emails : SendGrid**

## Accès au site

**https://www.samuel-christoph.fr**
