import React from 'react';
import { ArrowUpRight, Building2, Factory, Warehouse } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  category: string;
  imageUrl: string;
  link?: string;
  objectPosition?: string;
}

function ProjectCard({ category, imageUrl, link, objectPosition }: ProjectCardProps) {
  const { t } = useLanguage();
  
  const content = (
    <motion.div 
      className="group relative overflow-hidden rounded-lg"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={category}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${objectPosition || 'object-center'}`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 p-6 flex flex-col gap-2">
          <span className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1 text-xs font-medium text-white font-bold">
            {category}
          </span>
          {link && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span>{t('projects.visitProject')}</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

const projects = [
  {
    category: "Community & Website Moderator",
    imageUrl: "/top1.png",
    link: "https://top.gg/",
    objectPosition: "object-left-top",
  },
  {
    category: "Chief Technology Officer",
    imageUrl: "/egcmedia1.png",
    link: "https://ecgmedia.org/",
    objectPosition: "object-center",
  },
  {
    category: "Turkish Language Coordinator",
    imageUrl: "/medal1.png",
    link: "https://medal.tv/pt",
    objectPosition: "object-left-top",
  },
];


export const ProjectsPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 py-16 pb-32 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
              {t('projects.title').split('ForOwners').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>ForOwners</span>}
                </React.Fragment>
              ))}
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="mt-10 lg:pt-10 pt-10 lg:mx-0 mx-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-800">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}      
        </div>
      </div>
      
      {/* Enhanced gradient transition to the Clients section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#060623]/90 to-[#060623] opacity-100 pointer-events-none"></div>
      
      {/* Additional side gradients for smoother transition */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#060623] to-transparent opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#060623] to-transparent opacity-30 pointer-events-none"></div>
    </div>
  );
};
