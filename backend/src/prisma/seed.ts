import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      title: "Todo List Application",
      description: "Application web de gestion de tâches. Frontend en Angular, backend en Spring Boot, base PostgreSQL. Création, modification, suppression, réorganisation des tâches, filtrage par nom ou priorité, mode sombre.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove/todo-app"
    },
    {
      title: "Site de Gestion de budget Partagé",
      description: "Site web dynamique de gestion de budget commun. Backend en Node.js avec Express.js, routes REST sécurisées, authentification via Google OAuth, base PostgreSQL, orchestration via Docker.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m2_informatique/budget-app"
    },
    {
      title: "Application Mobile Deezer Blind Test",
      description: "Jeu Android utilisant l'API Deezer. Implémentation multi-écrans, gestion des entrées clavier, affichage dynamique, enregistrement des scores localement. Réalisé avec Android Studio en Java.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m2_informatique/programmation_mobile_android"
    },
    {
      title: "Système de Recommandation d’Offres d’Emploi",
      description: "Site simulant un service RH. L’utilisateur renseigne une offre, le système analyse plusieurs CV et recommande les plus pertinents. Backend en Python avec traitement NLP, interface web en HTML/CSS/JS.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m1_informatique/projet_tutore"
    },
    {
      title: "Tableau de bord IoT pour Skaters",
      description: "Tableau de bord intuitif avec Node-RED et JavaScript, utilisant une API météo et simulant des capteurs pour surveiller affluence, éclairage et météo.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m1_informatique/internet_des_objets/projet_IoT"
    },
    {
      title: "Simulation de Bar Électronique",
      description: "Développement d’un bar en C et Java avec TCP/UDP et RMI pour la communication inter-processus, utilisant mémoire partagée et sémaphores pour la synchronisation.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove/UPPA/tree/main/licence_informatique/l3_informatique/systemes_distribuees"
    },
    {
      title: "Plus de mes travaux sur GitHub",
      description: "Découvrez tous mes projets et réalisations directement sur mon GitHub.",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://github.com/tahlisfove"
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log("Seed completed ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
