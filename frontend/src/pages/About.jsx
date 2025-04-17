import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Swiftly</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At Swiftly, we believe in connecting talented freelancers with businesses that need their expertise. 
              Our platform makes it easy to find the right person for your project or to showcase your skills to potential clients.
            </p>
            <p className="text-gray-700">
              We're committed to creating a community where quality work is recognized and rewarded, 
              and where both freelancers and clients can thrive.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Swiftly was founded in 2023 by a team of freelancers who understood the challenges of finding quality work 
              and reliable clients. We built this platform to solve those problems and create a better experience for everyone.
            </p>
            <p className="text-gray-700">
              What started as a small community has grown into a global marketplace for talent, 
              connecting thousands of freelancers with businesses worldwide.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Quality</h3>
                  <p className="text-gray-600">We prioritize high-quality work and professional relationships.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Transparency</h3>
                  <p className="text-gray-600">Clear communication and honest feedback are essential to our community.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Community</h3>
                  <p className="text-gray-600">We foster a supportive environment where everyone can succeed.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Innovation</h3>
                  <p className="text-gray-600">We continuously improve our platform to better serve our users.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 