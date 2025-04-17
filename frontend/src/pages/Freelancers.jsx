import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'design', name: 'Design' },
    { id: 'writing', name: 'Writing' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const freelancers = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Web Developer',
      category: 'web-dev',
      rating: 4.9,
      hourlyRate: 45,
      image: 'https://via.placeholder.com/150',
      skills: ['React', 'Node.js', 'TypeScript'],
      description: 'Full-stack developer with 5+ years of experience building scalable web applications.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'UI/UX Designer',
      category: 'design',
      rating: 4.8,
      hourlyRate: 50,
      image: 'https://via.placeholder.com/150',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      description: 'Passionate UI/UX designer focused on creating intuitive and beautiful user experiences.',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'Content Writer',
      category: 'writing',
      rating: 4.7,
      hourlyRate: 30,
      image: 'https://via.placeholder.com/150',
      skills: ['Copywriting', 'SEO', 'Blog Writing'],
      description: 'Experienced content writer specializing in tech and business content.',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      title: 'Digital Marketing Specialist',
      category: 'marketing',
      rating: 4.9,
      hourlyRate: 40,
      image: 'https://via.placeholder.com/150',
      skills: ['SEO', 'Social Media', 'Email Marketing'],
      description: 'Digital marketing expert helping businesses grow their online presence.',
    },
    {
      id: 5,
      name: 'David Brown',
      title: 'Mobile App Developer',
      category: 'web-dev',
      rating: 4.6,
      hourlyRate: 55,
      image: 'https://via.placeholder.com/150',
      skills: ['React Native', 'Flutter', 'iOS Development'],
      description: 'Mobile app developer with experience in cross-platform development.',
    },
    {
      id: 6,
      name: 'Emily Davis',
      title: 'Graphic Designer',
      category: 'design',
      rating: 4.8,
      hourlyRate: 35,
      image: 'https://via.placeholder.com/150',
      skills: ['Adobe Illustrator', 'Photoshop', 'Branding'],
      description: 'Creative graphic designer specializing in brand identity and marketing materials.',
    },
  ];

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || freelancer.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Freelancers</h1>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search by name, skills, or title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map((freelancer) => (
          <div key={freelancer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{freelancer.name}</h3>
                  <p className="text-gray-600">{freelancer.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{freelancer.rating}</span>
                    <span className="ml-2 text-gray-500">({Math.floor(Math.random() * 100) + 20} reviews)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{freelancer.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">Hourly Rate:</span>
                  <span className="font-semibold ml-1">${freelancer.hourlyRate}/hr</span>
                </div>
                <Link
                  to={`/freelancer/${freelancer.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredFreelancers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No freelancers found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Freelancers; 