import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('7');

  // This would typically come from an API call
  const job = {
    id: parseInt(id || '1'),
    title: 'E-commerce Website Development',
    client: 'Fashion Retail Co.',
    category: 'web-dev',
    budget: 'medium',
    budgetAmount: '$800',
    postedDate: '2023-06-15',
    description: 'Looking for a developer to create a modern e-commerce website with product catalog, shopping cart, and payment integration.',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    proposals: 12,
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
        <li>Database: MongoDB</li>
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
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-gray-600">Posted by {job.client} • Posted {formatDate(job.postedDate)}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.budgetAmount}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-gray-700 mb-4">{job.description}</p>
              
              <div dangerouslySetInnerHTML={{ __html: job.additionalDetails }} />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Job Type</p>
                  <p className="font-medium">{job.jobType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Experience Level</p>
                  <p className="font-medium">{job.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-gray-600">Project Size</p>
                  <p className="font-medium">{job.projectSize}</p>
                </div>
                <div>
                  <p className="text-gray-600">Estimated Duration</p>
                  <p className="font-medium">{job.estimatedDuration}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Jobs Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  <Link to="/job/2" className="hover:text-blue-600">
                    React Developer for SaaS Platform
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-2">Posted by Tech Solutions Inc. • $1,200</p>
                <p className="text-gray-700 text-sm">Looking for a React developer to help build a SaaS platform with modern UI components.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  <Link to="/job/3" className="hover:text-blue-600">
                    Full-Stack E-commerce Developer
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-2">Posted by Retail Innovations • $950</p>
                <p className="text-gray-700 text-sm">Need a full-stack developer to create an e-commerce platform with inventory management.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  <Link to="/job/4" className="hover:text-blue-600">
                    Node.js API Development
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-2">Posted by API Solutions • $700</p>
                <p className="text-gray-700 text-sm">Seeking a Node.js developer to build RESTful APIs for a mobile application.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Client Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About the Client</h2>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-gray-600">{job.client.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium">{job.client}</h3>
                <p className="text-gray-600 text-sm">{job.clientLocation}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-medium">{job.clientRating}</span>
              <span className="text-gray-500 ml-1">({job.clientReviews} reviews)</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span>{formatDate(job.clientMemberSince)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jobs posted:</span>
                <span>{job.clientCompletedJobs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total spent:</span>
                <span>{job.clientSpent}</span>
              </div>
            </div>
          </div>
          
          {/* Submit Proposal Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Submit a Proposal</h2>
            <form onSubmit={handleSubmitProposal}>
              <div className="mb-4">
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Bid Amount ($)
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your bid amount"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Time (days)
                </label>
                <input
                  type="number"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter delivery time in days"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="proposalText" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  id="proposalText"
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe why you're the best fit for this job..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Proposal
              </button>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>You have 3 proposals left this month</p>
              <Link to="/membership" className="text-blue-600 hover:text-blue-800">
                Upgrade to submit more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 