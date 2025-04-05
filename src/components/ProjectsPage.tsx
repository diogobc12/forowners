import React from 'react';
import { ArrowUpRight, Building2, Factory, Warehouse } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

function ProjectCard({ title, category, tags, imageUrl }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-xl transition-all hover:shadow-2xl hover:opacity-100 opacity-60">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 p-6">
          <div className="mb-3 flex gap-2">
            <span className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-black font-bold">
              {category}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-white group-hover:underline">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: "Automotiva",
    category: "INDÚSTRIA",
    tags: ["Automação", "IoT"],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80",
  },
  {
    title: "SVarejo",
    category: "VAREJO",
    tags: ["ERP", "Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80",
  },
  {
    title: "Webflow",
    category: "Website",
    tags: ["Development", "Design"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
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

        <div className="mt-10 lg:pt-20 pt-10 lg:mx-0 mx-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-800">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};