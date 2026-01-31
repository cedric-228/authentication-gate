import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Développeur Full Stack Freelance',
    company: 'Indépendant',
    // period: '2022 - Présent',
    description: 'Développement d\'applications web et mobiles pour divers clients. Création de plateformes SaaS, sites e-commerce et applications de gestion.',
    skills: ['React', 'Laravel', 'Flutter', 'MySQL'],
  },
  {
    type: 'work',
    title: 'Designer UI/UX & Graphiste',
    company: 'Freelance',
    // period: '2021 - Présent',
    description: 'Conception d\'interfaces utilisateur modernes et création de supports visuels pour des entreprises et startups.',
    skills: ['Figma', 'Canva', 'Photoshop', 'Branding'],
  },
  {
    type: 'work',
    title: 'Développeur Web WordPress',
    company: 'Missions Freelance',
    // period: '2021 - 2023',
    description: 'Création de sites vitrines et e-commerce WordPress pour associations, agences de communication et entreprises locales.',
    skills: ['WordPress', 'WooCommerce', 'Elementor', 'PHP'],
  },
  {
    type: 'education',
    title: 'Formation en Informatique',
    company: 'Université / Auto-formation',
    // period: '2020 - Présent',
    description: 'Études en informatique et développement logiciel, complétées par une auto-formation continue sur les technologies modernes.',
    skills: ['Algorithmique', 'Programmation', 'Base de données', 'Web'],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-card/20" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm mb-4 block">
            Mon parcours
          </span>
          <h2 className="section-title">
            Expérience & <span className="gradient-text">Formation</span>
          </h2>
          <p className="section-subtitle">
            Un parcours dédié à l'apprentissage et à la création de solutions digitales innovantes
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent transform -translate-x-1/2 z-10 shadow-glow-sm" />

              {/* Content */}
              <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <motion.div
                  className="glass-card-hover p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Icon & Type */}
                  <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <div className="p-2 rounded-lg bg-primary/10">
                      {exp.type === 'work' ? (
                        <Briefcase className="w-4 h-4 text-primary" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-secondary" />
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {exp.type === 'work' ? 'Expérience' : 'Formation'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-semibold mb-2">{exp.title}</h3>
                  
                  {/* Company & Period */}
                  <div className={`flex items-center gap-4 mb-4 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="text-primary font-medium">{exp.company}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {/* {exp.period} */}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
