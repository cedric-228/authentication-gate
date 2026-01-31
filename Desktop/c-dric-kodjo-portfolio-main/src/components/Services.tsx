import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Brain, 
  PenTool, 
  Megaphone,
  Code,
  Database
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Développement Web',
    description: 'Création de sites web et applications web modernes, responsives et performants avec React, Laravel et les dernières technologies.',
    features: ['Sites vitrines', 'E-commerce', 'Applications SaaS', 'Intégration API'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Développement Mobile',
    description: 'Applications mobiles natives et cross-platform avec Flutter pour iOS et Android, performantes et intuitives.',
    features: ['Applications iOS', 'Applications Android', 'Cross-platform', 'Notifications Push'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Conception d\'interfaces utilisateur élégantes et d\'expériences utilisateur fluides qui captivent et convertissent.',
    features: ['Wireframing', 'Prototypage', 'Design System', 'Tests utilisateurs'],
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Brain,
    title: 'Intégration IA',
    description: 'Intégration de solutions d\'intelligence artificielle pour automatiser et améliorer vos processus métier.',
    features: ['Chatbots', 'Analyse de données', 'Recommandations', 'Automatisation'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: PenTool,
    title: 'Design Graphique',
    description: 'Création de visuels impactants pour votre identité de marque, supports marketing et réseaux sociaux.',
    features: ['Logos', 'Affiches', 'Branding', 'Social Media'],
    gradient: 'from-rose-500 to-red-500',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    description: 'Stratégies digitales pour augmenter votre visibilité et attirer plus de clients qualifiés.',
    features: ['SEO', 'Réseaux sociaux', 'Publicité', 'Analytics'],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Code,
    title: 'Intégration WordPress',
    description: 'Création et personnalisation de sites WordPress professionnels, thèmes sur mesure et plugins.',
    features: ['Thèmes custom', 'WooCommerce', 'Plugins', 'Maintenance'],
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Database,
    title: 'Backend & API',
    description: 'Développement de backends robustes et d\'APIs RESTful pour alimenter vos applications.',
    features: ['APIs RESTful', 'Base de données', 'Authentification', 'Paiements'],
    gradient: 'from-violet-500 to-purple-500',
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-background" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm mb-4 block">
            Ce que je propose
          </span>
          <h2 className="section-title">
            Mes <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Des solutions digitales complètes pour donner vie à vos projets les plus ambitieux
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group glass-card-hover p-6 h-full"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-5`}>
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <service.icon className={`w-6 h-6 bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent`} 
                    style={{ 
                      stroke: 'url(#gradient)', 
                      strokeWidth: 2,
                      fill: 'none'
                    }} 
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-heading font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.gradient}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Vous avez un projet en tête ? Discutons de comment je peux vous aider.
          </p>
          <motion.a
            href="#contact"
            className="btn-hero inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Démarrer un projet</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
