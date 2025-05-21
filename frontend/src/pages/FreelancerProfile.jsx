import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiDollarSign, FiMessageSquare, FiMail } from 'react-icons/fi';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  // Mock data for demonstration - this would typically come from an API
  const freelancers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'UI/UX Designer',
    rating: 4.9,
      hourlyRate: 85,
      location: 'San Francisco, CA',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      about: `I am a passionate UI/UX designer with expertise in creating beautiful and intuitive user interfaces. 
      I specialize in user-centered design principles and have worked with various clients to deliver exceptional digital experiences.`,
      experience: [
        {
          title: 'Senior UI/UX Designer',
          company: 'Design Studio Inc.',
          period: '2020 - Present',
          description: 'Leading design initiatives for enterprise clients and mentoring junior designers.',
        },
        {
          title: 'UI Designer',
          company: 'Creative Solutions',
          period: '2018 - 2020',
          description: 'Designed user interfaces for web and mobile applications.',
        },
      ],
      education: [
        {
          degree: 'Bachelor of Fine Arts in Design',
          school: 'Design University',
          year: '2018',
        },
      ],
      portfolio: [
        {
          title: 'E-commerce Redesign',
          description: 'Complete redesign of an e-commerce platform focusing on user experience',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
        {
          title: 'Mobile App Design',
          description: 'UI/UX design for a fitness tracking mobile application',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
      ],
      reviews: [
        {
          client: 'John Smith',
          rating: 5,
          comment: 'Sarah delivered exceptional work! Her attention to detail and user-centered approach made all the difference.',
          date: '2023-12-15',
        },
        {
          client: 'Emily Brown',
          rating: 5,
          comment: 'Working with Sarah was a pleasure. She understood our needs perfectly and delivered beyond expectations.',
          date: '2023-11-20',
        },
      ],
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      rating: 4.8,
      hourlyRate: 95,
      location: 'New York, NY',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      about: `I am a full-stack developer with expertise in building scalable web applications. 
      I specialize in modern JavaScript frameworks and cloud technologies, delivering robust solutions for businesses of all sizes.`,
    experience: [
      {
          title: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
          period: '2021 - Present',
        description: 'Leading development of enterprise web applications using React and Node.js.',
      },
      {
        title: 'Web Developer',
        company: 'Digital Innovations',
          period: '2019 - 2021',
        description: 'Developed and maintained multiple client websites and web applications.',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
          school: 'Tech University',
          year: '2019',
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
          client: 'David Wilson',
          rating: 5,
          comment: 'Michael is an exceptional developer. His technical expertise and problem-solving skills are outstanding.',
          date: '2023-12-10',
        },
        {
          client: 'Lisa Anderson',
          rating: 4,
          comment: 'Great work on our project. Michael was professional and delivered on time.',
          date: '2023-11-15',
        },
      ],
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Digital Marketing Specialist',
      rating: 4.7,
      hourlyRate: 65,
      location: 'Miami, FL',
      skills: ['SEO', 'Social Media', 'Content Strategy', 'Google Analytics'],
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      about: `I am a digital marketing specialist with a passion for helping businesses grow their online presence. 
      I specialize in SEO, social media marketing, and content strategy, delivering measurable results for my clients.`,
      experience: [
        {
          title: 'Senior Digital Marketing Specialist',
          company: 'Growth Marketing Agency',
          period: '2020 - Present',
          description: 'Leading digital marketing campaigns for various clients across different industries.',
        },
        {
          title: 'Marketing Coordinator',
          company: 'Digital Solutions',
          period: '2018 - 2020',
          description: 'Managed social media accounts and content creation for multiple clients.',
        },
      ],
      education: [
        {
          degree: 'Bachelor of Business Administration',
          school: 'Business University',
          year: '2018',
        },
      ],
      portfolio: [
        {
          title: 'E-commerce Growth Campaign',
          description: 'Increased online sales by 150% through targeted digital marketing strategies',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
        {
          title: 'Social Media Strategy',
          description: 'Developed and executed social media campaigns for a major retail brand',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
      ],
      reviews: [
        {
          client: 'Robert Taylor',
          rating: 5,
          comment: 'Emily helped us achieve remarkable growth in our online presence. Her strategies were effective and well-executed.',
          date: '2023-12-05',
        },
        {
          client: 'Maria Garcia',
          rating: 4,
          comment: 'Great work on our social media campaigns. Emily is professional and results-driven.',
          date: '2023-11-10',
        },
      ],
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Mobile App Developer',
      rating: 4.9,
      hourlyRate: 90,
      location: 'Remote',
      skills: ['React Native', 'iOS', 'Android', 'Flutter'],
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      about: `I am a mobile app developer specializing in cross-platform development. 
      I create high-performance, user-friendly mobile applications using modern technologies and best practices.`,
      experience: [
        {
          title: 'Senior Mobile Developer',
          company: 'AppWorks',
          period: '2021 - Present',
          description: 'Leading mobile app development for enterprise clients.',
        },
        {
          title: 'Mobile Developer',
          company: 'Tech Innovations',
          period: '2019 - 2021',
          description: 'Developed and maintained multiple mobile applications.',
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Software Engineering',
          school: 'Engineering University',
          year: '2019',
        },
      ],
      portfolio: [
        {
          title: 'Fitness Tracking App',
          description: 'A cross-platform mobile app for tracking workouts and nutrition',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
        {
          title: 'E-commerce Mobile App',
          description: 'A feature-rich mobile shopping application with real-time updates',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
      ],
      reviews: [
        {
          client: 'James Wilson',
          rating: 5,
          comment: 'David delivered an exceptional mobile app. His technical expertise and attention to detail are impressive.',
          date: '2023-12-01',
        },
        {
          client: 'Sarah Thompson',
          rating: 5,
          comment: 'Working with David was a great experience. He understood our requirements perfectly.',
          date: '2023-11-05',
        },
      ],
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Content Writer',
      rating: 4.8,
      hourlyRate: 55,
      location: 'London, UK',
      skills: ['Copywriting', 'Blog Writing', 'Technical Writing', 'SEO'],
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      about: `I am a professional content writer with expertise in creating engaging and SEO-optimized content. 
      I specialize in blog writing, technical documentation, and marketing copy that drives results.`,
      experience: [
        {
          title: 'Senior Content Writer',
          company: 'Content First',
          period: '2020 - Present',
          description: 'Creating high-quality content for various clients across different industries.',
        },
        {
          title: 'Content Writer',
          company: 'Digital Media',
          period: '2018 - 2020',
          description: 'Wrote blog posts and marketing copy for multiple clients.',
        },
      ],
      education: [
        {
          degree: 'Bachelor of Arts in English',
          school: 'University of London',
          year: '2018',
        },
      ],
      portfolio: [
        {
          title: 'Tech Blog Series',
          description: 'A series of technical blog posts that increased website traffic by 200%',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
        {
          title: 'Product Documentation',
          description: 'Comprehensive technical documentation for a software product',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
      ],
      reviews: [
        {
          client: 'Thomas Brown',
        rating: 5,
          comment: 'Lisa is an excellent writer. Her content is engaging and well-researched.',
          date: '2023-12-08',
      },
      {
          client: 'Emma Davis',
        rating: 4,
          comment: 'Great work on our blog content. Lisa is professional and delivers quality work.',
          date: '2023-11-15',
        },
      ],
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'Video Editor',
      rating: 4.9,
      hourlyRate: 75,
      location: 'Los Angeles, CA',
      skills: ['Adobe Premiere', 'After Effects', 'DaVinci Resolve', 'Motion Graphics'],
      image: 'https://randomuser.me/api/portraits/men/6.jpg',
      about: `I am a professional video editor with expertise in creating engaging visual content. 
      I specialize in video editing, motion graphics, and post-production for various media platforms.`,
      experience: [
        {
          title: 'Senior Video Editor',
          company: 'Creative Studios',
          period: '2020 - Present',
          description: 'Leading video production and editing for major clients.',
        },
        {
          title: 'Video Editor',
          company: 'Media Productions',
          period: '2018 - 2020',
          description: 'Edited videos for various clients and projects.',
        },
      ],
      education: [
        {
          degree: 'Bachelor of Fine Arts in Film Production',
          school: 'Film School',
          year: '2018',
        },
      ],
      portfolio: [
        {
          title: 'Brand Commercial',
          description: 'A high-impact commercial for a major brand',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
        {
          title: 'Music Video',
          description: 'A visually stunning music video with complex effects',
          image: 'https://via.placeholder.com/300x200',
          link: '#',
        },
      ],
      reviews: [
        {
          client: 'Michael Johnson',
          rating: 5,
          comment: 'James is an outstanding video editor. His work is creative and professional.',
          date: '2023-12-12',
        },
        {
          client: 'Rachel Green',
          rating: 5,
          comment: 'Working with James was a pleasure. He delivered exactly what we needed.',
        date: '2023-11-20',
      },
    ],
    },
  ];

  const freelancer = freelancers.find(f => f.id === parseInt(id)) || freelancers[0];

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <img
            src={freelancer.image}
            alt={freelancer.name}
              className="w-32 h-32 rounded-xl object-cover border-2 border-yellow-400"
          />
          <div className="flex-grow">
              <h1 className="text-3xl font-bold text-white mb-2">{freelancer.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{freelancer.title}</p>
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center text-yellow-400">
                  <FiStar className="mr-1" />
                  <span>{freelancer.rating}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FiMapPin className="mr-1" />
                  <span>{freelancer.location}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FiDollarSign className="mr-1" />
                  <span>${freelancer.hourlyRate}/hr</span>
                </div>
            </div>
              <div className="flex flex-wrap gap-2 mb-6">
              {freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]">
                  <FiMail className="inline-block mr-2" />
                Contact
              </button>
                <button 
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
                  onClick={() => navigate(`/chat/${freelancer.id}`)}
                >
                  <FiMessageSquare className="inline-block mr-2" />
                  Message
                </button>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Chat with {freelancer.name}</h2>
            <p className="text-gray-400">Chat component will be displayed here.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-400 whitespace-pre-line">{freelancer.about}</p>
          </div>

          {/* Experience Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
            <div className="space-y-6">
              {freelancer.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-4">
                    <h3 className="font-semibold text-lg text-white">{exp.title}</h3>
                    <p className="text-gray-400">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelancer.portfolio.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                    <a
                      href={item.link}
                        className="text-yellow-400 hover:text-yellow-500 transition-colors"
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
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Education</h2>
            <div className="space-y-4">
              {freelancer.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-4">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
            <div className="space-y-4">
              {freelancer.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                      <span className="font-semibold text-white">{review.client}</span>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-white">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2">{review.comment}</p>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile; 