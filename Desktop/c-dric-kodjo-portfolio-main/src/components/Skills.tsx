import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Langages',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'PHP', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Dart', level: 85 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 95 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'Frameworks & Outils',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Laravel', level: 85 },
      { name: 'Flutter', level: 82 },
      { name: 'Firebase', level: 80 },
      { name: 'MySQL', level: 85 },
      { name: 'WordPress', level: 78 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Canva', level: 90 },
      { name: 'Photoshop', level: 75 },
      { name: 'UI/UX Design', level: 88 },
      { name: 'Branding', level: 80 },
    ],
  },
  {
    title: 'Autres',
    skills: [
      { name: 'Marketing Digital', level: 75 },
      { name: 'SEO', level: 70 },
      { name: 'Intégration API', level: 85 },
      { name: 'Intégration IA', level: 78 },
      { name: 'Paiement en ligne', level: 80 },
    ],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm mb-4 block">
            Mes compétences
          </span>
          <h2 className="section-title">
            Technologies & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle">
            Une maîtrise complète des technologies modernes pour créer des solutions digitales exceptionnelles
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="glass-card-hover p-8"
            >
              <h3 className="text-xl font-heading font-semibold mb-6 gradient-text">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 glass-card p-8"
        >
          <h3 className="text-lg font-heading font-semibold mb-6 text-center text-muted-foreground">
            Technologies favorites
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React', 'Laravel', 'Flutter', 'JavaScript', 'PHP', 'MySQL', 
              'Firebase', 'Figma', 'Tailwind', 'WordPress', 'Java', 'Dart'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-5 py-2.5 rounded-full bg-card border border-border/50 text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
