import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, Download, Share, ArrowRight, Clock, User, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import quizService, { QuizSession } from '../services/quizService';

// Les interfaces sont maintenant importées du service

const QuizPage = () => {
  const { user, updateProfile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [attempts, setAttempts] = useState(1);

  const categories = [
    { id: 'web-dev', name: 'Développement Web & Mobile', icon: '💻', color: 'bg-blue-100 text-blue-800' },
    { id: 'design', name: 'Graphisme et Design', icon: '🎨', color: 'bg-purple-100 text-purple-800' },
    { id: 'communication', name: 'Gestion Communautaire / Communication', icon: '📱', color: 'bg-green-100 text-green-800' },
    { id: 'social', name: 'Missions Terrain & Action Sociale', icon: '🤝', color: 'bg-orange-100 text-orange-800' },
    { id: 'management', name: 'Gestion de Projet / Compétences Générales', icon: '📊', color: 'bg-indigo-100 text-indigo-800' },
  ];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted) {
      // Time's up, move to next question
      nextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizCompleted]);

  const startQuiz = (categoryId: string) => {
    const session = quizService.createQuizSession(categoryId);
    setQuizSession(session);
    setSelectedCategory(categoryId);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(45);
    setAttempts(1);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answerIndex });
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (quizSession && currentQuestion < (quizSession.questions.length - 1)) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setTimeLeft(45);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    if (!quizSession) return;
    
    const finalScore = quizService.calculateScore(quizSession.questions, selectedAnswers);
    setScore(finalScore);
    setQuizCompleted(true);

    // Add badge if score >= 70%
    if (finalScore >= 70) {
      const categoryName = categories.find(c => c.id === selectedCategory)?.name;
      const newBadge = `${categoryName} Certifié`;
      const currentBadges = user?.badges || [];
      if (!currentBadges.includes(newBadge)) {
        updateProfile({ badges: [...currentBadges, newBadge] });
      }
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
    setQuizSession(null);
    setAttempts(1);
  };

  const retryQuiz = () => {
    if (!selectedCategory || !quizSession) return;
    
    const newSession = quizService.retryQuiz(quizSession.sessionId, selectedCategory);
    setQuizSession(newSession);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
    setTimeLeft(45);
    setAttempts(newSession.attempts);
  };

  const downloadCertificate = () => {
    // Simulate certificate download
    const categoryName = categories.find(c => c.id === selectedCategory)?.name;
    alert(`Téléchargement de l'attestation "${categoryName}" - Score: ${score}%`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Connexion requise</h1>
          <p className="text-gray-600">Vous devez être connecté pour accéder aux quiz.</p>
        </div>
      </div>
    );
  }

  // La vérification de photo a été supprimée pour permettre l'accès aux quiz sans photo

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            {score >= 70 ? (
              <div className="text-center">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Félicitations ! 🎉</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Vous avez validé vos compétences en {categories.find(c => c.id === selectedCategory)?.name}
                </p>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">{score}%</div>
                  <p className="text-green-700">Votre badge est désormais disponible sur votre profil</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={downloadCertificate}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger l'attestation
                  </button>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                    <Share className="h-5 w-5 mr-2" />
                    Partager mon badge
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <XCircle className="h-20 w-20 text-orange-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Pas encore le bon score</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Continuez à apprendre ! Vous pouvez repasser le quiz pour améliorer vos compétences.
                </p>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{score}%</div>
                  <p className="text-orange-700">Il vous faut 70% pour obtenir le badge</p>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={resetQuiz}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Choisir un autre quiz
              </button>
              {score < 70 && (
                <button
                  onClick={retryQuiz}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Repasser le quiz (Tentative {attempts + 1})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizStarted && selectedCategory && quizSession) {
    const questions = quizSession.questions;
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-200 h-2">
              <div 
                className="bg-blue-800 h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Question {currentQuestion + 1} sur {questions.length}
                  </h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${quizService.getDifficultyColor(currentQ.difficulty)}`}>
                      {quizService.getDifficultyLabel(currentQ.difficulty)}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </p>
                  {attempts > 1 && (
                    <p className="text-sm text-blue-600 font-medium">
                      Tentative {attempts}
                    </p>
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-mono text-lg">{timeLeft}s</span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>

                <div className="space-y-4">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        selectedAnswers[currentQuestion] === index
                          ? selectedAnswers[currentQuestion] === currentQ.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-red-500 bg-red-50 text-red-800'
                          : showExplanation && index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showExplanation && selectedAnswers[currentQuestion] === index && (
                          selectedAnswers[currentQuestion] === currentQ.correctAnswer ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )
                        )}
                        {showExplanation && selectedAnswers[currentQuestion] !== index && index === currentQ.correctAnswer && (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Explication :</h4>
                  <p className="text-blue-800">{currentQ.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={resetQuiz}
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Abandonner le quiz
                </button>

                {showExplanation && (
                  <button
                    onClick={nextQuestion}
                    className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                  >
                    {currentQuestion === questions.length - 1 ? 'Terminer le quiz' : 'Question suivante'}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Évaluation des Compétences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testez vos compétences dans différentes catégories et obtenez des badges 
            pour renforcer votre profil. Chaque quiz validé enrichit votre passeport de compétences.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                    10 questions
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Durée estimée</span>
                    <span className="font-medium">10-15 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Seuil de réussite</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Certification</span>
                    <span className="font-medium text-green-600">Badge + Attestation PDF</span>
                  </div>
                </div>

                <button
                  onClick={() => startQuiz(category.id)}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Commencer le quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Choisissez votre catégorie</h4>
                <p className="text-blue-700">Sélectionnez le domaine dans lequel vous souhaitez être évalué</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Répondez aux questions</h4>
                <p className="text-blue-700">Questions variées avec explications pour apprendre</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Obtenez votre badge</h4>
                <p className="text-blue-700">Score ≥70% = Badge + Attestation téléchargeable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;