interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface QuizSession {
  category: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: number]: number };
  score: number;
  attempts: number;
  sessionId: string;
}

class QuizService {
  private baseQuestions: { [category: string]: Question[] } = {
    'web-dev': [
      {
        id: 1,
        question: "Quel est le langage principal utilisé pour le style des pages web ?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        correctAnswer: 1,
        explanation: "CSS (Cascading Style Sheets) est le langage utilisé pour styliser les éléments HTML.",
        difficulty: 'easy',
        category: 'web-dev'
      },
      {
        id: 2,
        question: "Que signifie 'DOM' en développement web ?",
        options: ["Data Object Model", "Document Object Model", "Dynamic Object Method", "Digital Object Management"],
        correctAnswer: 1,
        explanation: "DOM signifie Document Object Model, c'est l'interface qui représente la structure d'un document HTML.",
        difficulty: 'medium',
        category: 'web-dev'
      },
      {
        id: 3,
        question: "Quelle est la différence principale entre '==' et '===' en JavaScript ?",
        options: ["Aucune différence", "=== vérifie le type et la valeur", "== est plus rapide", "=== fonctionne seulement avec les nombres"],
        correctAnswer: 1,
        explanation: "=== vérifie à la fois le type et la valeur, tandis que == ne vérifie que la valeur avec conversion de type.",
        difficulty: 'medium',
        category: 'web-dev'
      },
      {
        id: 4,
        question: "Quel framework CSS est populaire pour le design responsive ?",
        options: ["Bootstrap", "jQuery", "Angular", "Node.js"],
        correctAnswer: 0,
        explanation: "Bootstrap est un framework CSS qui facilite la création de designs responsive et mobiles.",
        difficulty: 'easy',
        category: 'web-dev'
      },
      {
        id: 5,
        question: "Que fait la méthode 'fetch()' en JavaScript ?",
        options: ["Modifie le DOM", "Fait des requêtes HTTP", "Crée des variables", "Valide des formulaires"],
        correctAnswer: 1,
        explanation: "La méthode fetch() permet de faire des requêtes HTTP pour récupérer des données depuis un serveur.",
        difficulty: 'medium',
        category: 'web-dev'
      },
      {
        id: 6,
        question: "Qu'est-ce qu'un 'callback' en JavaScript ?",
        options: ["Une fonction passée en argument", "Une variable globale", "Un type de boucle", "Une méthode de classe"],
        correctAnswer: 0,
        explanation: "Un callback est une fonction qui est passée en argument à une autre fonction et qui est exécutée plus tard.",
        difficulty: 'hard',
        category: 'web-dev'
      },
      {
        id: 7,
        question: "Quelle méthode permet de créer un nouvel élément DOM ?",
        options: ["createElement()", "newElement()", "addElement()", "makeElement()"],
        correctAnswer: 0,
        explanation: "La méthode createElement() permet de créer un nouvel élément DOM en JavaScript.",
        difficulty: 'medium',
        category: 'web-dev'
      },
      {
        id: 8,
        question: "Qu'est-ce que le 'hoisting' en JavaScript ?",
        options: ["Le déplacement des déclarations en haut", "Une technique d'optimisation", "Un type de boucle", "Une méthode de débogage"],
        correctAnswer: 0,
        explanation: "Le hoisting est le comportement de JavaScript qui déplace les déclarations de variables et fonctions en haut de leur scope.",
        difficulty: 'hard',
        category: 'web-dev'
      },
      {
        id: 9,
        question: "Quel sélecteur CSS cible tous les éléments ?",
        options: ["*", ".", "#", "all"],
        correctAnswer: 0,
        explanation: "Le sélecteur universel '*' cible tous les éléments de la page.",
        difficulty: 'easy',
        category: 'web-dev'
      },
      {
        id: 10,
        question: "Qu'est-ce que 'this' en JavaScript ?",
        options: ["Le mot-clé this", "Une référence à l'objet courant", "Une variable globale", "Un type de fonction"],
        correctAnswer: 1,
        explanation: "'this' fait référence à l'objet courant dans le contexte d'exécution.",
        difficulty: 'hard',
        category: 'web-dev'
      }
    ],
    'design': [
      {
        id: 1,
        question: "Quelle est la règle des tiers en design ?",
        options: ["Diviser l'espace en 3 couleurs", "Diviser l'image en 9 sections égales", "Utiliser 3 polices maximum", "Créer 3 versions du design"],
        correctAnswer: 1,
        explanation: "La règle des tiers divise l'image en 9 sections égales avec 2 lignes horizontales et 2 verticales pour un meilleur équilibre visuel.",
        difficulty: 'easy',
        category: 'design'
      },
      {
        id: 2,
        question: "Quel format d'image préserve la transparence ?",
        options: ["JPEG", "PNG", "GIF", "PNG et GIF"],
        correctAnswer: 3,
        explanation: "Les formats PNG et GIF supportent la transparence, contrairement au JPEG.",
        difficulty: 'easy',
        category: 'design'
      },
      {
        id: 3,
        question: "Que signifie 'CMJN' en impression ?",
        options: ["Cyan Magenta Jaune Noir", "Couleur Moderne Juste Naturelle", "Centre Média Jeune Numérique", "Créatif Moderne Joli Nécessaire"],
        correctAnswer: 0,
        explanation: "CMJN (CMYK en anglais) représente Cyan, Magenta, Jaune (Yellow) et Noir (Key), les couleurs de base en impression.",
        difficulty: 'medium',
        category: 'design'
      },
      {
        id: 4,
        question: "Quelle résolution est recommandée pour l'impression ?",
        options: ["72 DPI", "150 DPI", "300 DPI", "600 DPI"],
        correctAnswer: 2,
        explanation: "300 DPI (dots per inch) est la résolution standard pour une impression de qualité.",
        difficulty: 'medium',
        category: 'design'
      },
      {
        id: 5,
        question: "Quel principe design crée une hiérarchie visuelle ?",
        options: ["La symétrie", "Le contraste", "La répétition", "L'alignement"],
        correctAnswer: 1,
        explanation: "Le contraste (taille, couleur, police) aide à créer une hiérarchie visuelle et guide l'œil du lecteur.",
        difficulty: 'medium',
        category: 'design'
      },
      {
        id: 6,
        question: "Qu'est-ce que la 'proximité' en design ?",
        options: ["La distance entre les éléments", "La similarité des couleurs", "La taille des polices", "L'angle des lignes"],
        correctAnswer: 0,
        explanation: "La proximité est le principe qui regroupe les éléments liés ensemble pour créer des relations visuelles.",
        difficulty: 'medium',
        category: 'design'
      },
      {
        id: 7,
        question: "Quel outil est le plus adapté pour le design vectoriel ?",
        options: ["Photoshop", "Illustrator", "InDesign", "Sketch"],
        correctAnswer: 1,
        explanation: "Adobe Illustrator est spécialement conçu pour le design vectoriel, contrairement à Photoshop qui est bitmap.",
        difficulty: 'easy',
        category: 'design'
      },
      {
        id: 8,
        question: "Qu'est-ce que le 'kerning' en typographie ?",
        options: ["L'espacement entre les lettres", "La taille de la police", "Le style de la police", "La couleur du texte"],
        correctAnswer: 0,
        explanation: "Le kerning est l'ajustement de l'espacement entre les lettres individuelles pour améliorer la lisibilité.",
        difficulty: 'hard',
        category: 'design'
      },
      {
        id: 9,
        question: "Quelle couleur est complémentaire du rouge ?",
        options: ["Bleu", "Vert", "Jaune", "Cyan"],
        correctAnswer: 1,
        explanation: "Le vert est la couleur complémentaire du rouge sur la roue chromatique.",
        difficulty: 'easy',
        category: 'design'
      },
      {
        id: 10,
        question: "Qu'est-ce que le 'white space' en design ?",
        options: ["L'espace blanc", "L'espace vide", "L'espace négatif", "Toutes ces réponses"],
        correctAnswer: 3,
        explanation: "Le white space (espace blanc) désigne l'espace vide ou négatif qui aide à structurer et équilibrer un design.",
        difficulty: 'medium',
        category: 'design'
      }
    ],
    'communication': [
      {
        id: 1,
        question: "Quel est le meilleur moment pour publier sur LinkedIn ?",
        options: ["Weekend matin", "Mardi-Jeudi 8h-10h", "Dimanche soir", "Tous les moments sont égaux"],
        correctAnswer: 1,
        explanation: "Les mardis, mercredis et jeudis entre 8h et 10h sont généralement les moments d'engagement optimaux sur LinkedIn.",
        difficulty: 'medium',
        category: 'communication'
      },
      {
        id: 2,
        question: "Que signifie 'taux d'engagement' sur les réseaux sociaux ?",
        options: ["Nombre de followers", "Likes + commentaires + partages / portée", "Nombre de publications", "Durée de connexion"],
        correctAnswer: 1,
        explanation: "Le taux d'engagement mesure l'interaction (likes, commentaires, partages) par rapport à la portée du contenu.",
        difficulty: 'medium',
        category: 'communication'
      },
      {
        id: 3,
        question: "Quelle longueur est idéale pour un post Facebook ?",
        options: ["10-20 mots", "40-80 caractères", "100-150 mots", "500+ mots"],
        correctAnswer: 1,
        explanation: "Les posts Facebook de 40-80 caractères génèrent généralement le plus d'engagement.",
        difficulty: 'easy',
        category: 'communication'
      },
      {
        id: 4,
        question: "Qu'est-ce qu'une 'stratégie de contenu' ?",
        options: ["Publier quotidiennement", "Plan organisé pour créer et diffuser du contenu", "Utiliser beaucoup d'hashtags", "Répondre aux commentaires"],
        correctAnswer: 1,
        explanation: "Une stratégie de contenu est un plan organisé qui définit quoi, quand, où et pourquoi publier du contenu.",
        difficulty: 'medium',
        category: 'communication'
      },
      {
        id: 5,
        question: "Quel outil permet de programmer des publications ?",
        options: ["Photoshop", "Hootsuite", "Word", "Excel"],
        correctAnswer: 1,
        explanation: "Hootsuite (ainsi que Buffer, Later, etc.) permet de programmer et gérer les publications sur plusieurs réseaux sociaux.",
        difficulty: 'easy',
        category: 'communication'
      },
      {
        id: 6,
        question: "Qu'est-ce que l'UGC (User Generated Content) ?",
        options: ["Contenu créé par les utilisateurs", "Contenu payant", "Contenu viral", "Contenu professionnel"],
        correctAnswer: 0,
        explanation: "L'UGC est le contenu créé par les utilisateurs eux-mêmes, souvent plus authentique et engageant.",
        difficulty: 'medium',
        category: 'communication'
      },
      {
        id: 7,
        question: "Quel est l'avantage principal du marketing d'influence ?",
        options: ["Coût élevé", "Authenticité et crédibilité", "Difficulté de mesure", "Temps de mise en place"],
        correctAnswer: 1,
        explanation: "Le marketing d'influence apporte authenticité et crédibilité grâce à la recommandation d'une personne de confiance.",
        difficulty: 'medium',
        category: 'communication'
      },
      {
        id: 8,
        question: "Qu'est-ce que le 'reach' sur les réseaux sociaux ?",
        options: ["Nombre de vues", "Nombre de personnes ayant vu le contenu", "Nombre de likes", "Durée de visualisation"],
        correctAnswer: 1,
        explanation: "Le reach représente le nombre de personnes uniques qui ont vu votre contenu.",
        difficulty: 'easy',
        category: 'communication'
      },
      {
        id: 9,
        question: "Quelle est la règle d'or pour les hashtags ?",
        options: ["En utiliser le maximum", "En utiliser 1-3 pertinents", "Ne jamais en utiliser", "Les changer constamment"],
        correctAnswer: 1,
        explanation: "Il vaut mieux utiliser 1-3 hashtags pertinents plutôt que d'en abuser, pour éviter le spam.",
        difficulty: 'easy',
        category: 'communication'
      },
      {
        id: 10,
        question: "Qu'est-ce que l'engagement organique ?",
        options: ["Engagement payant", "Engagement naturel sans publicité", "Engagement automatique", "Engagement ciblé"],
        correctAnswer: 1,
        explanation: "L'engagement organique est l'interaction naturelle des utilisateurs sans promotion payante.",
        difficulty: 'medium',
        category: 'communication'
      }
    ]
  };

  private usedQuestions: { [sessionId: string]: number[] } = {};

  generateQuizQuestions(category: string, sessionId: string, attempt: number = 1): Question[] {
    const baseQuestions = this.baseQuestions[category] || [];
    
    // Pour les tentatives suivantes, exclure les questions déjà utilisées
    const usedInSession = this.usedQuestions[sessionId] || [];
    let availableQuestions = baseQuestions;
    
    if (attempt > 1 && usedInSession.length > 0) {
      availableQuestions = baseQuestions.filter(q => !usedInSession.includes(q.id));
    }
    
    // Si pas assez de questions disponibles, mélanger et prendre les premières
    if (availableQuestions.length < 10) {
      availableQuestions = [...baseQuestions].sort(() => Math.random() - 0.5);
    }
    
    // Mélanger et prendre 10 questions
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 10);
    
    // Mélanger les options pour chaque question
    const questionsWithShuffledOptions = selectedQuestions.map(question => {
      const options = [...question.options];
      const correctAnswer = question.correctAnswer;
      
      // Mélanger les options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      // Trouver la nouvelle position de la bonne réponse
      const newCorrectAnswer = options.findIndex(option => option === question.options[correctAnswer]);
      
      return {
        ...question,
        options,
        correctAnswer: newCorrectAnswer
      };
    });
    
    // Enregistrer les questions utilisées
    this.usedQuestions[sessionId] = [
      ...usedInSession,
      ...selectedQuestions.map(q => q.id)
    ];
    
    return questionsWithShuffledOptions;
  }

  createQuizSession(category: string): QuizSession {
    const sessionId = `quiz_${category}_${Date.now()}`;
    const questions = this.generateQuizQuestions(category, sessionId, 1);
    
    return {
      category,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      attempts: 1,
      sessionId
    };
  }

  retryQuiz(sessionId: string, category: string): QuizSession {
    const attempt = (this.usedQuestions[sessionId]?.length || 0) / 10 + 1;
    const questions = this.generateQuizQuestions(category, sessionId, attempt);
    
    return {
      category,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      attempts: attempt,
      sessionId
    };
  }

  calculateScore(questions: Question[], answers: { [key: number]: number }): number {
    let correctAnswers = 0;
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / questions.length) * 100);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getDifficultyLabel(difficulty: string): string {
    switch (difficulty) {
      case 'easy':
        return 'Facile';
      case 'medium':
        return 'Intermédiaire';
      case 'hard':
        return 'Difficile';
      default:
        return 'Inconnu';
    }
  }
}

export default new QuizService();
export type { Question, QuizSession };

