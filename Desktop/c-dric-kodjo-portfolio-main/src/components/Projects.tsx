import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

// Import project images
import footballApp from '@/assets/projects/football-app.jpg';
import jobPlatform from '@/assets/projects/job-platform.jpg';
import cinemaPlatform from '@/assets/projects/cinema-platform.jpg';
import taskManager from '@/assets/projects/task-manager.jpg';
import pharmacyApp from '@/assets/projects/pharmacy-app.jpg';
import wordpressAgency from '@/assets/projects/wordpress-agency.jpg';
import footballPayment from '@/assets/projects/football-payment.jpg';
import gestionPlatform from '@/assets/projects/gestion-platform.jpg';

const projects = [
  {
    id: 1,
    title: 'Application Football',
    description: 'Application mobile et web complète pour la gestion de matchs, scores, statistiques et équipes. Développée avec Laravel et Flutter.',
    image: footballApp,
    technologies: ['Laravel', 'Flutter', 'MySQL', 'API REST'],
    category: 'Mobile & Web',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 2,
    title: 'Plateforme de Recherche d\'Emploi avec IA',
    description: 'Plateforme innovante de recherche d\'emploi et de stage avec IA intégrée pour l\'évaluation des compétences, génération de certificats et espace recruteurs.',
    image: jobPlatform,
    technologies: ['React', 'Laravel', 'IA', 'MySQL'],
    category: 'Web App',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 3,
    title: 'Plateforme Cinématographique UGP',
    description: 'Site vitrine et galerie pour une entreprise cinématographique. Présentation de l\'entreprise, galerie de films et médias.',
    image: cinemaPlatform,
    technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    category: 'WordPress',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 4,
    title: 'Application de Gestion de Tâches',
    description: 'Application moderne de gestion de tâches et projets avec dashboard, suivi des deadlines et collaboration d\'équipe.',
    image: taskManager,
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    category: 'Web App',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 5,
    title: 'Gestion de Pharmacie',
    description: 'Application Java desktop pour la gestion complète d\'une pharmacie : inventaire, ventes, prescriptions et analytics.',
    image: pharmacyApp,
    technologies: ['Java', 'MySQL', 'JavaFX'],
    category: 'Desktop',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 6,
    title: 'Site Agence de Communication',
    description: 'Site vitrine WordPress pour une agence de communication. Design moderne, portfolio créatif et formulaire de contact.',
    image: wordpressAgency,
    technologies: ['WordPress', 'Elementor', 'CSS', 'PHP'],
    category: 'WordPress',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 7,
    title: 'Plateforme Foot avec Paiement',
    description: 'Plateforme en ligne de football avec système de paiement intégré, streaming et gestion des paris.',
    image: footballPayment,
    technologies: ['Laravel', 'Vue.js', 'Stripe', 'MySQL'],
    category: 'Web App',
    link: 'https://github.com/cedric-228',
  },
  {
    id: 8,
    title: 'Plateforme de Gestion et Isolation',
    description: 'Solution complète de gestion d\'activités avec paiements intégrés, dashboard analytics et gestion clients.',
    image: gestionPlatform,
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web App',
    link: 'https://github.com/cedric-228',
  },
];

const categories = ['Tous', 'Web App', 'Mobile & Web', 'WordPress', 'Desktop'];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm mb-4 block">
            Portfolio
          </span>
          <h2 className="section-title">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="section-subtitle">
            Une sélection de mes réalisations les plus récentes et impactantes
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm'
                  : 'glass-card text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group glass-card-hover overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredProject === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
                
                {/* Overlay Actions */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary text-secondary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium glass-card">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
                >
                  Voir le projet
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/cedric-228"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-glow inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            <span>Voir tous mes projets sur GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
