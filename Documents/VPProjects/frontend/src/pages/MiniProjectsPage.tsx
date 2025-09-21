import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Play, 
  CheckCircle, 
  Clock, 
  Upload, 
  Eye, 
  Trash2, 
  Star,
  MapPin,
  Calendar,
  FileText,
  Award,
  Bot
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import miniProjectService, { MiniProject, CreateMiniProjectData } from '../services/miniProjectService';

const MiniProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<MiniProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'in_progress' | 'submitted' | 'completed'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<MiniProject | null>(null);
  const [submissionData, setSubmissionData] = useState({
    description: '',
    files: [] as File[]
  });

  useEffect(() => {
    loadProjects();
  }, [activeTab]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await miniProjectService.getMiniProjects(activeTab);
      setProjects(data);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAISuggestions = async () => {
    try {
      setLoading(true);
      const suggestions = await miniProjectService.generateSuggestions(3);
      setProjects(prev => [...suggestions, ...prev]);
      // Afficher un message de succès
      alert('L\'IA a généré 3 nouveaux mini-projets adaptés à votre profil!');
    } catch (error) {
      console.error('Erreur lors de la génération des suggestions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  
  const getAIFeedback = async () => {
    if (!selectedProject || !submissionData.description) {
      alert('Veuillez d\'abord rédiger une description de votre soumission');
      return;
    }
    
    try {
      setAiLoading(true);
      const feedback = await miniProjectService.getAIFeedback(
        selectedProject.id, 
        submissionData.description
      );
      setAiFeedback(feedback);
    } catch (error) {
      console.error('Erreur lors de l\'obtention du feedback IA:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const acceptProject = async (project: MiniProject) => {
    try {
      await miniProjectService.acceptProject(project.id);
      loadProjects();
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du projet:', error);
    }
  };

  const submitProject = async () => {
    if (!selectedProject) return;
    
    try {
      await miniProjectService.submitProject(selectedProject.id, {
        submission_description: submissionData.description,
        submission_files: submissionData.files
      });
      setShowSubmitModal(false);
      setSelectedProject(null);
      setSubmissionData({ description: '', files: [] });
      loadProjects();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  const deleteProject = async (project: MiniProject) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    
    try {
      await miniProjectService.deleteProject(project.id);
      loadProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubmissionData(prev => ({
        ...prev,
        files: Array.from(e.target.files!)
      }));
    }
  };

  const tabs = [
    { id: 'active', label: 'Disponibles', count: projects.filter(p => p.status === 'active').length },
    { id: 'in_progress', label: 'En cours', count: projects.filter(p => p.status === 'in_progress').length },
    { id: 'submitted', label: 'Soumis', count: projects.filter(p => p.status === 'submitted').length },
    { id: 'completed', label: 'Terminés', count: projects.filter(p => p.status === 'completed').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des mini-projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mini-Projets IA</h1>
            <p className="text-gray-600">
              Des projets personnalisés générés par l'IA pour développer vos compétences
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={generateAISuggestions}
              className="bg-gradient-to-r from-blue-800 to-emerald-500 hover:from-blue-900 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200"
            >
              <Bot className="h-5 w-5 mr-2" />
              Générer avec l'IA
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Créer un projet
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-800 text-blue-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}</h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' 
                ? 'Générez des suggestions avec l\'IA ou créez votre propre projet.'
                : 'Vos projets apparaîtront ici une fois créés.'
              }
            </p>
            {activeTab === 'active' && (
              <button
                onClick={generateAISuggestions}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium"
              >
                Générer des suggestions
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${miniProjectService.getDifficultyColor(project.difficulty_level)}`}>
                          {miniProjectService.getDifficultyLabel(project.difficulty_level)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${miniProjectService.getStatusColor(project.status)}`}>
                          {miniProjectService.getStatusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                    {project.status === 'active' && (
                      <button
                        onClick={() => deleteProject(project)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {project.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {project.location}
                    </div>
                    {project.is_paid && (
                      <div className="flex items-center text-sm text-green-600 font-medium">
                        <Award className="h-4 w-4 mr-2" />
                        {project.amount}
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{project.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {project.status === 'active' && (
                      <button
                        onClick={() => acceptProject(project)}
                        className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Accepter
                      </button>
                    )}
                    {project.status === 'in_progress' && (
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setShowSubmitModal(true);
                        }}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Soumettre
                      </button>
                    )}
                    {project.status === 'submitted' && (
                      <div className="flex-1 bg-purple-100 text-purple-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
                        En attente d'évaluation
                      </div>
                    )}
                    {project.status === 'completed' && (
                      <div className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg text-sm font-medium text-center flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Terminé
                      </div>
                    )}
                    {project.status === 'rejected' && (
                      <div className="flex-1 bg-red-100 text-red-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
                        Rejeté
                      </div>
                    )}
                  </div>

                  {/* Review Score */}
                  {project.review_score && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Score d'évaluation</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{project.review_score}/100</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Modal */}
        {showSubmitModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                <h2 className="text-2xl font-bold">Soumettre le projet</h2>
                <p className="text-orange-100">{selectedProject.title}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description de votre travail
                    </label>
                    <textarea
                      value={submissionData.description}
                      onChange={(e) => setSubmissionData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Décrivez ce que vous avez accompli, les défis rencontrés, les solutions apportées..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fichiers de soumission
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Formats acceptés: PDF, DOC, DOCX, JPG, PNG, ZIP (max 10MB par fichier)
                    </p>
                  </div>
                  
                  {submissionData.files.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers sélectionnés:</h4>
                      <ul className="space-y-1">
                        {submissionData.files.map((file, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {file.name} ({miniProjectService.formatFileSize(file.size)})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => {
                      setShowSubmitModal(false);
                      setSelectedProject(null);
                      setSubmissionData({ description: '', files: [] });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={submitProject}
                    disabled={!submissionData.description.trim()}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Soumettre
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniProjectsPage;
