import React from 'react';
import { ArrowUpRight, Building2, Factory, Warehouse } from 'lucide-react';
import { image } from 'framer-motion/client';

interface ProjectCardProps {
  category: string;
  imageUrl: string;
  link?: string;
  objectPosition?: string;
}

function ProjectCard({ category, imageUrl, link, objectPosition }: ProjectCardProps) {
  const content = (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={category}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${objectPosition || 'object-center'}`}

        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 p-6">
          <span className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-black font-bold">
            {category}
          </span>
        </div>
      </div>
    </div>
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
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="text-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center ">
              Projects made by <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>Forowners</span>
            </h2>
          </div>
        </div>

        <div className="mt-10 lg:pt-20 pt-10 lg:mx-0 mx-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-800">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}      
        </div>
      </div>
    </div>
  );
};
