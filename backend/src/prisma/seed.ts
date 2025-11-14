import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // liste des projets à insérer dans la db
  const projects = [
    {
      title: "Portfolio personnel interactif",
      description: "Portfolio moderne et bilingue présentant mes projets et compétences fullstack. Navigation fluide, sections claires, formulaire de contact sécurisé, intégration d'animations et responsive design pour une expérience utilisateur optimale sur tous les supports.",
      translations: {
        title_en: "Interactive Personal Portfolio",
        description_en: "Modern bilingual portfolio showcasing my projects and fullstack skills. Smooth navigation, clear sections, secure contact form, integrated animations, and responsive design for an optimal user experience on all devices."
      },
      imageUrl: "/icons/projects/portfolio.png",
      link: "https://github.com/tahlisfove/portfolio-web",
      tags: ["React", "TypeScript", "CSS", "UI/UX", "Node.js", "Prisma"]
    },
    {
      title: "Application de gestion de tâches",
      description: "Application web de gestion de tâches complète : création, modification, suppression, réorganisation des tâches, filtrage par nom ou priorité. Interface intuitive avec support du mode sombre et intégration frontend Angular et backend Spring Boot relié à une base PostgreSQL.",
      translations: {
        title_en: "Todo List Application",
        description_en: "Full-featured web task manager: create, update, delete, reorder tasks, filter by name or priority. Intuitive UI with dark mode support, Angular frontend and Spring Boot backend with PostgreSQL."
      },
      imageUrl: "/icons/projects/todolist.png",
      link: "https://github.com/tahlisfove/todo-app",
      tags: ["Angular", "Spring Boot", "PostgreSQL", "TypeScript", "CRUD", "UI/UX"]
    },
    {
      title: "Site de Gestion de budget Partagé",
      description: "Application collaborative pour gérer un budget commun. Authentification sécurisée via OAuth, suivi des dépenses en temps réel, historique des transactions et intégration complète backend Node.js avec Express et PostgreSQL, orchestrée avec Docker.",
      translations: {
        title_en: "Shared Budget Management Site",
        description_en: "Collaborative application to manage a shared budget. Secure OAuth authentication, real-time expense tracking, transaction history, full Node.js backend with Express and PostgreSQL, orchestrated with Docker."
      },
      imageUrl: "/icons/projects/tricount.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m2_informatique/budget-app",
      tags: ["Node.js", "Express", "PostgreSQL", "OAuth", "REST API", "Docker"]
    },
    {
      title: "Application Mobile Deezer Blind Test",
      description: "Jeu musical Android avec interface multi-écrans et suivi des scores. Intégration de l'API Deezer pour récupérer les titres, gestion des entrées clavier et des interactions utilisateur, stockage local des scores et navigation fluide entre les écrans grâce à Android Studio et Java.",
      translations: {
        title_en: "Deezer Blind Test Mobile App",
        description_en: "Android music game with multi-screen interface and score tracking. Deezer API integration, keyboard input handling, local score storage, smooth navigation between screens with Android Studio and Java."
      },
      imageUrl: "/icons/projects/blindtest.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m2_informatique/programmation_mobile_android",
      tags: ["Java", "Android Studio", "API", "UI/UX", "Multi-screen", "Scoreboard"]
    },
    {
      title: "Système de Recommandation d’Offres d’Emploi",
      description: "Outil de simulation RH pour recommander des CV pertinents. Analyse des données à l'aide de NLP et machine learning, traitement des offres et profils, interface web simple pour la saisie des offres, backend Python robuste et automatisation des recommandations.",
      translations: {
        title_en: "Job Offer Recommendation System",
        description_en: "HR simulation tool to recommend relevant CVs. Data analysis using NLP and machine learning, offer and profile processing, simple web interface for job entries, robust Python backend with automated recommendations."
      },
      imageUrl: "/icons/projects/recommendation.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m1_informatique/projet_tutore",
      tags: ["Python", "NLP", "Machine Learning", "API", "Data", "Processing"]
    },
    {
      title: "Tableau de bord IoT pour Skaters",
      description: "Dashboard interactif simulant des capteurs IoT et affichant météo, affluence et éclairage des skateparks. Interface frontend avec Node-RED et JavaScript, intégration d'API météo, simulation des données capteurs et visualisation graphique des résultats pour une expérience utilisateur immersive.",
      translations: {
        title_en: "IoT Dashboard for Skaters",
        description_en: "Interactive dashboard simulating IoT sensors displaying weather, crowd, and skatepark lighting. Frontend with Node-RED and JavaScript, weather API integration, sensor data simulation, and visual graph results."
      },
      imageUrl: "/icons/projects/skatepark.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m1_informatique/internet_des_objets/projet_IoT",
      tags: ["Node-RED", "JavaScript", "API", "IoT", "Dashboard", "Sensors"]
    },
    {
      title: "Simulation de Bar Électronique",
      description: "Simulation d’un bar avec gestion multi-processus. Communication inter-processus via TCP/UDP et RMI, utilisation de sémaphores et mémoire partagée pour synchroniser les clients, interface utilisateur minimaliste mais fonctionnelle pour tester la logique des systèmes distribués.",
      translations: {
        title_en: "Electronic Bar Simulation",
        description_en: "Simulation of a bar with multi-process management. Inter-process communication via TCP/UDP and RMI, using semaphores and shared memory for client synchronization, minimal but functional UI to test distributed systems logic."
      },
      imageUrl: "/icons/projects/bar.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/licence_informatique/l3_informatique/systemes_distribuees",
      tags: ["C", "Java", "TCP/UDP", "RMI", "IPC", "Synchronization"]
    },
    {
      title: "Plus de mes travaux sur GitHub",
      description: "Découvrez tous mes projets et réalisations directement sur mon GitHub.",
      translations: {
        title_en: "More of my work on GitHub",
        description_en: "Discover all my projects and work directly on my GitHub."
      },
      imageUrl: "",
      link: "https://github.com/tahlisfove",
      tags: []
    }
  ];

  // supprime les projets existants pour éviter doublons
  await prisma.project.deleteMany({});

  // insère les projets un à un
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
