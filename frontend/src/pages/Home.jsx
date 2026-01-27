import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import NumberTicker from '../components/animation/NumberTicker';
import Globe, { FloatingTitle3D } from '../components/animation/Globe';

const Home = () => {
  const [videoSrc, setVideoSrc] = React.useState(
    window.innerWidth >= 768 ? '/desktop_view.mp4' : '/mobile_view.mp4'
  );
  const [showStickyButtons, setShowStickyButtons] = React.useState(true);
  const ctaRef = React.useRef(null);

  const [visibleFeatureIndex, setVisibleFeatureIndex] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      const newSrc = window.innerWidth >= 768 ? '/desktop_view.mp4' : '/mobile_view.mp4';
      setVideoSrc(prevSrc => prevSrc !== newSrc ? newSrc : prevSrc);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHubChange = (hubIndex) => {
    // Show cards sequentially based on hub index
    // Use modulo if number of hubs > number of features
    const featureIndex = hubIndex % features.length;
    setVisibleFeatureIndex(featureIndex);
  };

  const features = [
    {
      id: 1,
      title: 'Find Top Talent',
      description: 'Connect with skilled freelancers from around the world.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/msoeawqm.json" // Search/People icon
            trigger="hover"
            colors="primary:#121331,secondary:#ffc738"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 2,
      title: 'Quality Work',
      description: 'Get high-quality results from experienced professionals.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/edplgash.json"
            trigger="hover"
            colors="primary:#ffc738,secondary:#3a3347,tertiary:#d1e3fa"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your needs.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/byicyhmi.json"
            trigger="hover"
            colors="primary:#646e78,secondary:#f9c9c0,tertiary:#d1e3fa,quaternary:#b26836,quinary:#eee966"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 4,
      title: 'Global Reach',
      description: 'Work with talent from over 150 countries.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/oaflahpk.json" // Globe/World icon
            trigger="hover"
            colors="primary:#fbbf24,secondary:#ffffff"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 5,
      title: 'Secure Payments',
      description: 'Your money is safe with our escrow protection.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/jxwksgwv.json"
            trigger="hover"
            colors="primary:#fbbf24,secondary:#ffffff"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 6,
      title: 'Fast Turnaround',
      description: 'Get your projects completed on time, every time.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/gqzfzudq.json" // Clock/Time
            trigger="hover"
            colors="primary:#fbbf24,secondary:#ffffff"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 7,
      title: 'Verified Profiles',
      description: 'We rigorously vet freelancers for authenticity.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/egiwmiit.json" // Checkmark/Shield
            trigger="hover"
            colors="primary:#fbbf24,secondary:#ffffff"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      id: 8,
      title: 'Collaborative Tools',
      description: 'Built-in chat, file sharing, and project management.',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/zpxybbhl.json" // Communication
            trigger="hover"
            colors="primary:#fbbf24,secondary:#ffffff"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    }
  ];

  const popularCategories = [
    { id: 1, name: 'Web Development', count: 1500 },
    { id: 2, name: 'Graphic Design', count: 1200 },
    { id: 3, name: 'Content Writing', count: 800 },
    { id: 4, name: 'Digital Marketing', count: 600 },
    { id: 5, name: 'Video & Animation', count: 400 },
    { id: 6, name: 'Mobile Development', count: 300 },
  ];

  const stats = [
    { id: 1, number: 10, suffix: 'K+', label: 'Active Freelancers' },
    { id: 2, number: 5, suffix: 'K+', label: 'Completed Projects' },
    { id: 3, number: 98, suffix: '%', label: 'Client Satisfaction' },
    { id: 4, number: 24, suffix: '|7', label: 'Support Available' },
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide sticky buttons when CTA section is visible
        setShowStickyButtons(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of CTA is visible
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          key={videoSrc} // Force re-render on source change
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{
            zIndex: 0,
            objectFit: 'cover',
            objectPosition: 'center',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
          aria-label="Background video"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 w-full h-full pointer-events-none">
          {/* Fixed CTA Buttons - Smart Hide on Scroll */}
          <div
            className={`flex flex-col sm:flex-row gap-4 fixed bottom-6 right-6 sm:bottom-10 sm:right-10 left-6 sm:left-auto z-50 transition-all duration-500 transform ${showStickyButtons ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'}`}
          >
            <Link
              to="/freelancers"
              className="w-full sm:w-auto text-center bg-yellow-400 text-black px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-black/50"
            >
              Find Freelancers
            </Link>
            <Link
              to="/jobs"
              className="w-full sm:w-auto text-center bg-black/80 backdrop-blur-md border-2 border-yellow-400 text-yellow-400 px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-black transition-all duration-300 transform hover:scale-105 shadow-lg shadow-black/50"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Globe */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <Globe onHubChange={handleHubChange} />

        {/* 3D Floating Title */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-[250px] md:top-1/2 md:-translate-y-1/2 md:left-4 md:translate-x-0 md:w-[600px] md:h-[400px] pointer-events-none z-20 transition-all duration-500">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <React.Suspense fallback={null}>
              <FloatingTitle3D />
            </React.Suspense>
          </Canvas>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-[200px] md:pt-0">
          <div className="relative h-[400px] flex items-center justify-center">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`absolute w-full max-w-md transition-all duration-700 ${index === visibleFeatureIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90 pointer-events-none'
                  }`}
              >
                <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-yellow-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Trusted By Industry Leaders</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of companies who trust our platform for their freelance needs
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  <NumberTicker number={stat.number} suffix={stat.suffix} duration={4000} />
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Company Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-transparent hover:border-gray-700">
              <img
                src="https://www.vectorlogo.zone/logos/google/google-ar21.svg"
                alt="Google logo"
                className="h-8 w-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-transparent hover:border-gray-700">
              <img
                src="https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg"
                alt="Microsoft logo"
                className="h-8 w-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-transparent hover:border-gray-700">
              <img
                src="https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg"
                alt="Amazon logo"
                className="h-8 w-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                style={{ filter: 'brightness(10) grayscale(100%)', opacity: 0.5 }} // Amazon logo is dark, force white
              />
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-transparent hover:border-gray-700">
              <div className="relative">
                <img
                  src="https://brandlogos.net/wp-content/uploads/2021/10/meta-logo-512x512.png"
                  alt="Meta logo"
                  className="h-8 w-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 invert"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-transparent hover:border-gray-700">
              <div className="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/505px-Apple_logo_white.svg.png"
                  alt="Apple logo"
                  className="h-8 w-auto opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-transparent hover:border-gray-700">
              <img
                src="https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg"
                alt="Netflix logo"
                className="h-8 w-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories with Interactive Cards */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-400">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCategories.map((category) => (
              <div
                key={category.id}
                className="group bg-black/50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800 hover:border-yellow-400/50"
              >
                <div className="w-16 h-16 mx-auto mb-4">
                  <lord-icon
                    src={
                      category.name === 'Web Development' ? "https://cdn.lordicon.com/qhgmphtg.json" : // Computer
                        category.name === 'Graphic Design' ? "https://cdn.lordicon.com/wjyqkiew.json" : // Palette/Design
                          category.name === 'Content Writing' ? "https://cdn.lordicon.com/wloilxuq.json" : // Pen/Doc
                            category.name === 'Digital Marketing' ? "https://cdn.lordicon.com/ofwpzftr.json" : // Megaphone
                              category.name === 'Video & Animation' ? "https://cdn.lordicon.com/tdxypxgp.json" : // Video Camera
                                "https://cdn.lordicon.com/fhtaantg.json" // Mobile Phone
                    }
                    trigger="hover"
                    colors="primary:#fbbf24,secondary:#ffffff"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-400 text-center">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-center">{category.count} freelancers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-yellow-400">
            How Swiftly Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-black/50 p-8 rounded-xl border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6">
                  <lord-icon
                    src="https://cdn.lordicon.com/wloilxuq.json"
                    trigger="hover"
                    colors="primary:#fbbf24,secondary:#ffffff"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-400 text-center">Post Your Project</h3>
                <p className="text-gray-300 text-center">
                  Share your project details, requirements, and budget. Let freelancers know exactly what you need.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-black/50 p-8 rounded-xl border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6">
                  <lord-icon
                    src="https://cdn.lordicon.com/uukerzzv.json"
                    trigger="hover"
                    colors="primary:#fbbf24,secondary:#ffffff"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-400 text-center">Review Proposals</h3>
                <p className="text-gray-300 text-center">
                  Receive and review detailed proposals from skilled freelancers ready to start your project.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-black/50 p-8 rounded-xl border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6">
                  <lord-icon
                    src="https://cdn.lordicon.com/lupuorrc.json"
                    trigger="hover"
                    colors="primary:#fbbf24,secondary:#ffffff"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-400 text-center">Get Work Done</h3>
                <p className="text-gray-300 text-center">
                  Choose the best freelancer, collaborate effectively, and get your project completed to satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              to="/jobs"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Find Jobs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <section className="py-20 bg-black text-white relative overflow-hidden" ref={ctaRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-black pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-400">
            Join thousands of freelancers and clients who trust our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Sign Up Now
            </Link>
            <Link
              to="/about"
              className="bg-black/30 backdrop-blur-sm border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400/10 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 