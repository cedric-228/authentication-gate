import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-3xl font-heading font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            CK<span className="text-primary">.</span>
          </motion.a>

          {/* Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Accueil', 'À Propos', 'Compétences', 'Projets', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '').replace('à', 'a')}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/cedric-228' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/koffi-c%C3%A9dric-kodjo-8a041a3a8/' },
              { icon: Mail, href: 'mailto:kofficedrickodjo@gmail.com' },
              { icon: Phone, href: 'https://wa.me/22899873715' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg glass-card text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} KODJO KOFFI CÉDRIC. Tous droits réservés.
          </p>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Créé avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> à Lomé, Togo
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-xl glass-card-hover text-primary"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
