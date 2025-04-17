import React from 'react';
import { useParams, Link } from 'react-router-dom';

const FreelancerProfile = () => {
  const { id } = useParams();

  // This would typically come from an API call
  const freelancer = {
    id: parseInt(id || '1'),
    name: 'John Doe',
    title: 'Web Developer',
    category: 'web-dev',
    rating: 4.9,
    hourlyRate: 45,
    image: 'https://via.placeholder.com/150',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
    description: 'Full-stack developer with 5+ years of experience building scalable web applications.',
    about: `I am a passionate full-stack developer with expertise in modern web technologies. 
    I specialize in building scalable and maintainable applications using React, Node.js, and TypeScript.
    My approach combines clean code principles with efficient problem-solving to deliver high-quality solutions.`,
    experience: [
      {
        title: 'Senior Web Developer',
        company: 'Tech Solutions Inc.',
        period: '2020 - Present',
        description: 'Leading development of enterprise web applications using React and Node.js.',
      },
      {
        title: 'Web Developer',
        company: 'Digital Innovations',
        period: '2018 - 2020',
        description: 'Developed and maintained multiple client websites and web applications.',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        year: '2018',
      },
    ],
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform built with React and Node.js',
        image: 'https://via.placeholder.com/300x200',
        link: '#',
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates',
        image: 'https://via.placeholder.com/300x200',
        link: '#',
      },
    ],
    reviews: [
      {
        client: 'Sarah Johnson',
        rating: 5,
        comment: 'Excellent work! John delivered the project on time and exceeded our expectations.',
        date: '2023-12-15',
      },
      {
        client: 'Michael Brown',
        rating: 4,
        comment: 'Very professional and skilled developer. Would recommend for any web development project.',
        date: '2023-11-20',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={freelancer.image}
            alt={freelancer.name}
            className="w-32 h-32 rounded-full"
          />
          <div className="flex-grow">
            <h1 className="text-3xl font-bold">{freelancer.name}</h1>
            <p className="text-xl text-gray-600 mb-2">{freelancer.title}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 font-semibold">{freelancer.rating}</span>
              <span className="ml-2 text-gray-500">({freelancer.reviews.length} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-gray-600">Hourly Rate:</span>
                <span className="font-semibold ml-1">${freelancer.hourlyRate}/hr</span>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-700 whitespace-pre-line">{freelancer.about}</p>
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              {freelancer.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelancer.portfolio.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <a
                      href={item.link}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Education Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              {freelancer.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="space-y-4">
              {freelancer.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold">{review.client}</span>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile; 