import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiMapPin, FiUser, FiCalendar } from 'react-icons/fi';

const JobDetail = () => {
  const { id } = useParams();
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('7');

  // Mock data for demonstration - this would typically come from an API
  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      posted: '2 days ago',
      description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using React and Node.js.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      logo: 'https://ui-avatars.com/api/?name=TC&background=000&color=fff',
    clientRating: 4.8,
    clientReviews: 24,
    clientLocation: 'New York, USA',
    clientMemberSince: '2021-03-10',
    clientCompletedJobs: 15,
    clientSpent: '$12,500',
    jobType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    projectSize: 'Medium',
    estimatedDuration: '1-3 months',
    additionalDetails: `
      <h3>Project Requirements:</h3>
      <ul>
        <li>Responsive design that works on all devices</li>
        <li>Product catalog with filtering and search functionality</li>
        <li>Shopping cart with secure checkout process</li>
        <li>Integration with payment gateways (Stripe, PayPal)</li>
        <li>Admin dashboard for managing products and orders</li>
        <li>User accounts with order history</li>
      </ul>
      
      <h3>Technical Requirements:</h3>
      <ul>
        <li>Frontend: React.js with responsive design</li>
        <li>Backend: Node.js with Express</li>
          <li>Database: PostgreSQL</li>
        <li>Authentication: JWT</li>
        <li>Payment Processing: Stripe API</li>
      </ul>
      
      <h3>Deliverables:</h3>
      <ul>
        <li>Complete source code</li>
        <li>Database schema</li>
        <li>API documentation</li>
        <li>Deployment instructions</li>
        <li>3 months of technical support</li>
      </ul>
    `,
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studios',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$70k - $100k',
      posted: '3 days ago',
      description: 'Join our design team to create beautiful and intuitive user interfaces for our clients. Strong background in user-centered design principles required.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      logo: 'https://ui-avatars.com/api/?name=CS&background=000&color=fff',
      clientRating: 4.9,
      clientReviews: 18,
      clientLocation: 'San Francisco, CA',
      clientMemberSince: '2020-06-15',
      clientCompletedJobs: 12,
      clientSpent: '$8,500',
      jobType: 'Fixed Price',
      experienceLevel: 'Intermediate',
      projectSize: 'Medium',
      estimatedDuration: '2-4 months',
      additionalDetails: `
        <h3>Project Requirements:</h3>
        <ul>
          <li>Create user-centered designs by understanding business requirements</li>
          <li>Develop wireframes and prototypes</li>
          <li>Create user flows and journey maps</li>
          <li>Conduct user research and usability testing</li>
          <li>Collaborate with developers to implement designs</li>
        </ul>
        
        <h3>Technical Requirements:</h3>
        <ul>
          <li>Proficiency in Figma and Adobe XD</li>
          <li>Experience with user research methodologies</li>
          <li>Knowledge of design systems and component libraries</li>
          <li>Understanding of accessibility standards</li>
        </ul>
        
        <h3>Deliverables:</h3>
        <ul>
          <li>Wireframes and prototypes</li>
          <li>User research reports</li>
          <li>Design system documentation</li>
          <li>Final design assets</li>
        </ul>
      `,
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      company: 'Growth Marketing',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$60/hr',
      posted: '1 week ago',
      description: 'Lead our digital marketing initiatives across multiple channels. Experience with SEO, content marketing, and social media management required.',
      skills: ['SEO', 'Content Strategy', 'Social Media', 'Google Analytics'],
      logo: 'https://ui-avatars.com/api/?name=GM&background=000&color=fff',
      clientRating: 4.7,
      clientReviews: 15,
      clientLocation: 'New York, NY',
      clientMemberSince: '2021-01-20',
      clientCompletedJobs: 10,
      clientSpent: '$6,000',
      jobType: 'Hourly',
      experienceLevel: 'Expert',
      projectSize: 'Large',
      estimatedDuration: '6+ months',
      additionalDetails: `
        <h3>Project Requirements:</h3>
        <ul>
          <li>Develop and execute digital marketing strategies</li>
          <li>Manage social media accounts and content creation</li>
          <li>Optimize website for search engines</li>
          <li>Analyze and report on marketing performance</li>
          <li>Manage paid advertising campaigns</li>
        </ul>
        
        <h3>Technical Requirements:</h3>
        <ul>
          <li>Experience with Google Analytics and SEO tools</li>
          <li>Knowledge of social media platforms and management tools</li>
          <li>Understanding of content marketing principles</li>
          <li>Experience with paid advertising platforms</li>
        </ul>
        
        <h3>Deliverables:</h3>
        <ul>
          <li>Digital marketing strategy document</li>
          <li>Monthly performance reports</li>
          <li>Content calendar and assets</li>
          <li>SEO optimization recommendations</li>
        </ul>
      `,
    },
    {
      id: 4,
      title: 'Mobile App Developer',
      company: 'AppWorks',
      location: 'Remote',
      type: 'Part-time',
      salary: '$50/hr',
      posted: '5 days ago',
      description: 'Develop cross-platform mobile applications using React Native. Experience with iOS and Android development is a plus.',
      skills: ['React Native', 'iOS', 'Android', 'Firebase'],
      logo: 'https://ui-avatars.com/api/?name=AW&background=000&color=fff',
      clientRating: 4.8,
      clientReviews: 20,
      clientLocation: 'Remote',
      clientMemberSince: '2020-09-05',
      clientCompletedJobs: 8,
      clientSpent: '$5,000',
      jobType: 'Hourly',
      experienceLevel: 'Intermediate',
      projectSize: 'Medium',
      estimatedDuration: '3-6 months',
      additionalDetails: `
        <h3>Project Requirements:</h3>
        <ul>
          <li>Develop cross-platform mobile applications</li>
          <li>Implement user interface and functionality</li>
          <li>Integrate with backend services</li>
          <li>Ensure app performance and quality</li>
          <li>Collaborate with design and backend teams</li>
        </ul>
        
        <h3>Technical Requirements:</h3>
        <ul>
          <li>Experience with React Native</li>
          <li>Knowledge of iOS and Android development</li>
          <li>Understanding of mobile app architecture</li>
          <li>Experience with Firebase or similar backend services</li>
        </ul>
        
        <h3>Deliverables:</h3>
        <ul>
          <li>Cross-platform mobile application</li>
          <li>Source code and documentation</li>
          <li>App store submission packages</li>
          <li>Testing and deployment instructions</li>
        </ul>
      `,
    },
    {
      id: 5,
      title: 'Content Writer',
      company: 'ContentFirst',
      location: 'Remote',
      type: 'Freelance',
      salary: '$40/hr',
      posted: '1 day ago',
      description: 'Create engaging content for technology and business blogs. Strong understanding of SEO and content marketing principles required.',
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Research'],
      logo: 'https://ui-avatars.com/api/?name=CF&background=000&color=fff',
      clientRating: 4.9,
      clientReviews: 30,
      clientLocation: 'Remote',
      clientMemberSince: '2021-02-15',
      clientCompletedJobs: 25,
      clientSpent: '$15,000',
      jobType: 'Hourly',
      experienceLevel: 'Intermediate',
      projectSize: 'Small',
      estimatedDuration: '1-3 months',
      additionalDetails: `
        <h3>Project Requirements:</h3>
        <ul>
          <li>Write engaging blog posts and articles</li>
          <li>Research industry topics and trends</li>
          <li>Optimize content for search engines</li>
          <li>Edit and proofread content</li>
          <li>Meet deadlines and content goals</li>
        </ul>
        
        <h3>Technical Requirements:</h3>
        <ul>
          <li>Strong writing and editing skills</li>
          <li>Knowledge of SEO best practices</li>
          <li>Experience with content management systems</li>
          <li>Understanding of content marketing principles</li>
        </ul>
        
        <h3>Deliverables:</h3>
        <ul>
          <li>Blog posts and articles</li>
          <li>Content calendar</li>
          <li>SEO optimization reports</li>
          <li>Content performance analytics</li>
        </ul>
      `,
    },
    {
      id: 6,
      title: 'Video Editor',
      company: 'StreamMedia',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$55/hr',
      posted: '4 days ago',
      description: 'Edit and produce high-quality video content for social media and marketing campaigns. Proficiency in Adobe Creative Suite required.',
      skills: ['Adobe Premiere', 'After Effects', 'Color Grading', 'Motion Graphics'],
      logo: 'https://ui-avatars.com/api/?name=SM&background=000&color=fff',
      clientRating: 4.8,
      clientReviews: 22,
      clientLocation: 'Los Angeles, CA',
      clientMemberSince: '2020-11-10',
      clientCompletedJobs: 18,
      clientSpent: '$10,000',
      jobType: 'Hourly',
      experienceLevel: 'Expert',
      projectSize: 'Medium',
      estimatedDuration: '3-6 months',
      additionalDetails: `
        <h3>Project Requirements:</h3>
        <ul>
          <li>Edit video content for various platforms</li>
          <li>Create motion graphics and visual effects</li>
          <li>Color grade and enhance footage</li>
          <li>Collaborate with creative team</li>
          <li>Meet project deadlines</li>
        </ul>
        
        <h3>Technical Requirements:</h3>
        <ul>
          <li>Proficiency in Adobe Premiere Pro</li>
          <li>Experience with After Effects</li>
          <li>Knowledge of color grading techniques</li>
          <li>Understanding of video compression and formats</li>
        </ul>
        
        <h3>Deliverables:</h3>
        <ul>
          <li>Edited video content</li>
          <li>Motion graphics and effects</li>
          <li>Color graded footage</li>
          <li>Project files and assets</li>
        </ul>
      `,
    }
  ];

  const job = jobs.find(j => j.id === parseInt(id)) || jobs[0];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    // This would typically handle proposal submission
    console.log('Proposal submitted:', { proposalText, bidAmount, deliveryTime });
    alert('Your proposal has been submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center">
                      <FiUser className="mr-1" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
              </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-medium">
                    {job.salary}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            
              <div className="prose prose-invert max-w-none mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
                <p className="text-gray-400 mb-6">{job.description}</p>
              
              <div dangerouslySetInnerHTML={{ __html: job.additionalDetails }} />
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
          <div className="space-y-6">
          {/* Client Info */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">About the Client</h2>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">{job.company.charAt(0)}</span>
              </div>
              <div>
                  <h3 className="font-medium text-white">{job.company}</h3>
                  <p className="text-gray-400 text-sm">{job.clientLocation}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 mr-1">★</span>
                <span className="font-medium text-white">{job.clientRating}</span>
                <span className="text-gray-400 ml-1">({job.clientReviews} reviews)</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                  <span className="text-gray-400">Member since:</span>
                  <span className="text-white">{formatDate(job.clientMemberSince)}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-gray-400">Jobs posted:</span>
                  <span className="text-white">{job.clientCompletedJobs}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-gray-400">Total spent:</span>
                  <span className="text-white">{job.clientSpent}</span>
              </div>
            </div>
          </div>
          
          {/* Submit Proposal Form */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Submit a Proposal</h2>
            <form onSubmit={handleSubmitProposal}>
              <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Bid Amount ($)
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your bid amount"
                  required
                />
              </div>
              
              <div className="mb-4">
                  <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-400 mb-1">
                  Delivery Time (days)
                </label>
                <input
                  type="number"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter delivery time in days"
                  required
                />
              </div>
              
              <div className="mb-4">
                  <label htmlFor="proposalText" className="block text-sm font-medium text-gray-400 mb-1">
                    Proposal
                </label>
                <textarea
                  id="proposalText"
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows="4"
                    placeholder="Describe your approach and why you're the best fit for this job..."
                  required
                  />
              </div>
              
              <button
                type="submit"
                  className="w-full bg-yellow-400 text-black px-6 py-3 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Submit Proposal
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 