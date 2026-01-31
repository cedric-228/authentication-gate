import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '3+', label: 'Années d\'expérience' },
    { value: '25+', label: 'Projets réalisés' },
    { value: '15+', label: 'Clients satisfaits' },
    { value: '10+', label: 'Technologies' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm mb-4 block">
              À propos de moi
            </span>
            <h2 className="section-title">
              Passionné par le
              <span className="gradient-text"> développement digital</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Je suis un <span className="text-foreground font-medium">développeur web, mobile et designer graphique</span> passionné 
              par la création d'applications modernes, performantes et esthétiques. Basé à Lomé, Togo, je conçois des 
              plateformes web, mobiles et des interfaces professionnelles avec un fort accent sur l'expérience utilisateur, 
              la performance et l'innovation.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Mon expertise couvre le développement <span className="text-primary">Full Stack</span>, la conception 
              <span className="text-secondary"> UI/UX</span>, l'intégration d'<span className="text-accent">IA</span>, 
              et le design graphique. Je m'engage à livrer des solutions qui dépassent les attentes de mes clients.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: MapPin, label: 'Localisation', value: 'Adakpamé, Lomé, Togo' },
                { icon: Calendar, label: 'Expérience', value: '3+ Années' },
                { icon: Briefcase, label: 'Statut', value: 'Freelance / Disponible' },
                { icon: GraduationCap, label: 'Formation', value: 'Informatique' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="glass-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download CV */}
            <motion.a
              href="/cv-cedric-kodjo.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-flex items-center gap-2 btn-hero"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Télécharger mon CV</span>
            </motion.a>
          </motion.div>

          {/* Right - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="glass-card-hover p-8 text-center"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 glass-card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Actuellement disponible</span>
              </div>
              <p className="text-foreground font-medium">
                Je suis ouvert aux opportunités de freelance, stages et postes à temps plein.
                N'hésitez pas à me contacter pour discuter de vos projets !
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
