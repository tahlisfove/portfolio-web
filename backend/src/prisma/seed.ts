import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* tableau des projets à insérer dans la base */
async function main() {
  const projects = [
    {
      title: "Portfolio personnel interactif",
      description: "Portfolio moderne et bilingue présentant mes projets et compétences fullstack. Navigation fluide, sections claires, formulaire de contact sécurisé, intégration d'animations et responsive design pour une expérience utilisateur optimale sur tous les supports.",
      imageUrl: "/icons/logo_samuel.png",
      link: "https://github.com/tahlisfove/portfolio-web",
      tags: ["React", "TypeScript", "CSS", "UIUX", "Node.js", "Prisma"]
    },
    {
      title: "Todo List Application",
      description: "Application web de gestion de tâches complète : création, modification, suppression, réorganisation des tâches, filtrage par nom ou priorité. Interface intuitive avec support du mode sombre et intégration frontend Angular et backend Spring Boot relié à une base PostgreSQL.",
      imageUrl: "/icons/todolist.png",
      link: "https://github.com/tahlisfove/todo-app",
      tags: ["Angular", "Spring Boot", "PostgreSQL", "TypeScript", "CRUD", "UIUX"]
    },
    {
      title: "Site de Gestion de budget Partagé",
      description: "Application collaborative pour gérer un budget commun. Authentification sécurisée via OAuth, suivi des dépenses en temps réel, historique des transactions et intégration complète backend Node.js avec Express et PostgreSQL, orchestrée avec Docker.",
      imageUrl: "/icons/tricount.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m2_informatique/budget-app",
      tags: ["Node.js", "Express", "PostgreSQL", "OAuth", "REST API", "Docker"]
    },
    {
      title: "Application Mobile Deezer Blind Test",
      description: "Jeu musical Android avec interface multi-écrans et suivi des scores. Intégration de l'API Deezer pour récupérer les titres, gestion des entrées clavier et des interactions utilisateur, stockage local des scores et navigation fluide entre les écrans grâce à Android Studio et Java.",
      imageUrl: "/icons/blindtest.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m2_informatique/programmation_mobile_android",
      tags: ["Java", "Android Studio", "API", "UIUX", "Multi-screen", "Scoreboard"]
    },
    {
      title: "Système de Recommandation d’Offres d’Emploi",
      description: "Outil de simulation RH pour recommander des CV pertinents. Analyse des données à l'aide de NLP et machine learning, traitement des offres et profils, interface web simple pour la saisie des offres, backend Python robuste et automatisation des recommandations.",
      imageUrl: "/icons/recommendation.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m1_informatique/projet_tutore",
      tags: ["Python", "NLP", "Machine Learning", "API", "Data", "Processing"]
    },
    {
      title: "Tableau de bord IoT pour Skaters",
      description: "Dashboard interactif simulant des capteurs IoT et affichant météo, affluence et éclairage des skateparks. Interface frontend avec Node-RED et JavaScript, intégration d'API météo, simulation des données capteurs et visualisation graphique des résultats pour une expérience utilisateur immersive.",
      imageUrl: "/icons/skatepark.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/master_informatique/m1_informatique/internet_des_objets/projet_IoT",
      tags: ["Node-RED", "JavaScript", "API", "IoT", "Dashboard", "Sensors"]
    },
    {
      title: "Simulation de Bar Électronique",
      description: "Simulation d’un bar avec gestion multi-processus. Communication inter-processus via TCP/UDP et RMI, utilisation de sémaphores et mémoire partagée pour synchroniser les clients, interface utilisateur minimaliste mais fonctionnelle pour tester la logique des systèmes distribués.",
      imageUrl: "/icons/bar.png",
      link: "https://github.com/tahlisfove/UPPA/tree/main/licence_informatique/l3_informatique/systemes_distribuees",
      tags: ["C", "Java", "TCP/UDP", "RMI", "IPC", "Synchronization"]
    },
    {
      title: "Plus de mes travaux sur GitHub",
      description: "Découvrez tous mes projets et réalisations directement sur mon GitHub.",
      imageUrl: "",
      link: "https://github.com/tahlisfove",
      tags: []
    }
  ];

  /* suppression de tous les projets existants dans la base */
  await prisma.project.deleteMany({});
  
  /* insertion des projets définis ci-dessus */
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
}

/* exécution de la fonction principale avec gestion d'erreurs */
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    /* déconnexion prisma */
    await prisma.$disconnect();
  });
