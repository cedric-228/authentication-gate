import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Briefcase, Users, FolderKanban, Award } from 'lucide-react';

const stats = [
  {
    icon: FolderKanban,
    value: 25,
    suffix: '+',
    label: 'Projets Réalisés',
    description: 'Applications web, mobiles et designs',
  },
  {
    icon: Users,
    value: 15,
    suffix: '+',
    label: 'Clients Satisfaits',
    description: 'Entreprises et particuliers',
  },
  {
    icon: Briefcase,
    value: 3,
    suffix: '+',
    label: 'Années d\'Expérience',
    description: 'En développement et design',
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    label: 'Technologies Maîtrisées',
    description: 'Frameworks et outils modernes',
  },
];

const Counter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card-hover p-8 text-center"
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Counter */}
              <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
