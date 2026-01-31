import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jean-Pierre K.',
    role: 'Directeur, Agence de Communication',
    content: 'Cédric a créé un site WordPress exceptionnel pour notre agence. Son sens du design et sa réactivité sont remarquables. Je recommande vivement ses services.',
    rating: 5,
  },
  {
    name: 'Marie A.',
    role: 'Fondatrice, Startup Tech',
    content: 'La plateforme web développée par Cédric a dépassé toutes nos attentes. Interface intuitive, code propre et respect des délais. Un vrai professionnel !',
    rating: 5,
  },
  {
    name: 'Emmanuel T.',
    role: 'Gérant, Association Locale',
    content: 'Notre site vitrine est maintenant notre meilleur outil de communication. Cédric a su comprendre nos besoins et les transformer en un site moderne et efficace.',
    rating: 5,
  },
  {
    name: 'Sophie D.',
    role: 'Responsable Marketing',
    content: 'Excellent travail sur nos visuels et notre identité de marque. Cédric est créatif, à l\'écoute et livre toujours un travail de qualité.',
    rating: 5,
  },
  {
    name: 'Kofi M.',
    role: 'Entrepreneur',
    content: 'L\'application mobile développée par Cédric fonctionne parfaitement. Support réactif et mises à jour régulières. Très satisfait de la collaboration !',
    rating: 5,
  },
  {
    name: 'Akua B.',
    role: 'CEO, Production Cinématographique',
    content: 'Notre plateforme de présentation d\'entreprise est magnifique. Cédric a su capturer l\'essence de notre marque avec un design élégant et professionnel.',
    rating: 5,
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm mb-4 block">
            Témoignages
          </span>
          <h2 className="section-title">
            Ce que disent <span className="gradient-text">mes clients</span>
          </h2>
          <p className="section-subtitle">
            La satisfaction de mes clients est ma plus grande récompense
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card-hover p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
