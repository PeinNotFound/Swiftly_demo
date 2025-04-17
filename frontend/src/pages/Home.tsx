import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const featuredFreelancers = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Web Developer',
      rating: 4.9,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'UI/UX Designer',
      rating: 4.8,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'Content Writer',
      rating: 4.7,
      image: 'https://via.placeholder.com/150',
    },
  ];

  const categories = [
    { id: 1, name: 'Web Development', icon: '💻' },
    { id: 2, name: 'Graphic Design', icon: '🎨' },
    { id: 3, name: 'Content Writing', icon: '✍️' },
    { id: 4, name: 'Digital Marketing', icon: '📱' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Find the Perfect Freelancer for Your Project</h1>
            <p className="text-xl mb-8">Connect with talented freelancers and get your work done</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Freelancers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Freelancers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFreelancers.map((freelancer) => (
              <div
                key={freelancer.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">{freelancer.name}</h3>
                <p className="text-gray-600 text-center mb-2">{freelancer.title}</p>
                <div className="flex justify-center items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{freelancer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
              >
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 