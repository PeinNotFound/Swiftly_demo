import { Link } from 'react-router-dom';

const Home = () => {


  const features = [
    {
      title: 'Find Top Talent',
      description: 'Connect with skilled freelancers from around the world',
      icon: (
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/xvmmqwjv.json"
            trigger="hover"
            colors="primary:#121331,secondary:#848484,tertiary:#ffc738,quaternary:#9cf4a7,quinary:#9ce5f4"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
    },
    {
      title: 'Quality Work',
      description: 'Get high-quality results from experienced professionals',
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
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your needs',
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
  ];

  const popularCategories = [
    { name: 'Web Development', icon: '💻', count: 1500 },
    { name: 'Graphic Design', icon: '🎨', count: 1200 },
    { name: 'Content Writing', icon: '✍️', count: 800 },
    { name: 'Digital Marketing', icon: '📱', count: 600 },
    { name: 'Video & Animation', icon: '🎥', count: 400 },
    { name: 'Mobile Development', icon: '📱', count: 300 },
  ];

  const stats = [
    { number: '10K+', label: 'Active Freelancers' },
    { number: '5K+', label: 'Completed Projects' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
  ];

  

  return (
    <div className="min-h-screen">
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
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
        >
          <source src="/SWIFTLY_moving.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full">
          <div className="flex flex-col sm:flex-row gap-4 absolute bottom-12 right-12">
            <Link
              to="/freelancers"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Find Freelancers
            </Link>
            <Link
              to="/jobs"
              className="bg-black/30 backdrop-blur-sm border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-black/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Company Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
              <img 
                src="https://www.vectorlogo.zone/logos/google/google-ar21.svg" 
                alt="Google" 
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
              <img 
                src="https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" 
                alt="Microsoft" 
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
              <svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 603 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M374.003 141.263c-27.258 20.077-66.739 30.783-100.726 30.783-47.631 0-90.509-17.607-122.976-46.903-2.554-2.314-.27-5.47 2.794-3.676 35.115 20.43 78.605 32.718 123.465 32.718 30.277 0 63.563-6.272 94.155-19.225 4.606-1.952 8.469 3.027 3.288 6.303z" fill="#FF9900"/>
                <path d="M388.072 125.45c-3.48-4.462-23.062-2.12-31.86-1.07-2.674.317-3.086-2.014-.674-3.704 15.614-10.973 41.214-7.81 44.172-4.139 2.957 3.695-1.27 28.408-14.927 40.265-2.176 1.87-4.241.87-3.28-1.555 3.184-7.934 10.296-25.735 6.569-29.797z" fill="#FF9900"/>
                <path d="M348.813 23.155V13.11c0-1.78.135-3.238 2.009-3.238h35.547c1.139 0 2.043 1.458 2.043 3.238v8.605c-.012 1.834-1.569 4.235-4.317 8.038l-18.427 26.301c6.848-.161 14.082.863 20.32 4.364 1.41.795 1.785 1.959 1.897 3.107v10.718c0 1.17-1.287 2.532-2.636 1.829-11.035-5.79-25.703-6.422-37.9.067-1.242.685-2.546-.673-2.546-1.843v-10.186c0-1.297.027-3.511 1.314-5.478l21.353-30.634h-18.596c-1.139 0-2.061-1.458-2.061-3.236v.001zM190.686 85.623h-10.811c-1.028-.073-1.846-.854-1.934-1.848V13.131c0-1.117.937-2.005 2.111-2.005h10.083c1.066.058 1.918.874 1.993 1.913v9.272h.202c2.629-7.006 7.567-10.27 14.215-10.27 6.75 0 10.99 3.264 14.013 10.27 2.626-7.006 8.595-10.27 14.988-10.27 4.548 0 9.502 1.871 12.533 6.082 3.435 4.67 2.73 11.447 2.73 17.392l-.006 48.076c0 1.118-.937 2.01-2.109 2.01h-10.79c-1.092-.073-1.959-.94-1.959-2.01V42.674c0-2.532.224-8.844-.327-11.243-.879-4.027-3.509-5.158-6.911-5.158-2.831 0-5.797 1.895-7.006 4.932-1.21 3.037-.944 8.095-.944 11.469v40.917c0 1.118-.938 2.01-2.11 2.01h-10.79c-1.099-.073-1.959-.94-1.959-2.01l-.011-40.916c0-6.696.944-16.548-7.199-16.548-8.404 0-8.064 9.584-8.064 16.548v40.916c0 1.118-.937 2.01-2.11 2.01v.002zM459.035 1.839c16.003 0 24.676 13.749 24.676 31.24 0 16.894-9.578 30.315-24.676 30.315-15.726 0-24.278-13.749-24.278-30.855 0-17.262 8.649-30.7 24.278-30.7zm.094 11.377c-7.947 0-8.45 10.835-8.45 17.592 0 6.765-.101 21.214 8.355 21.214 8.353 0 8.756-11.651 8.756-18.743 0-4.674-.202-10.27-1.614-14.726-1.209-3.873-3.611-5.337-7.047-5.337zM499.877 85.623h-10.773c-1.089-.073-1.959-.94-1.959-2.01l-.015-70.482c.091-1.027.936-1.82 1.99-1.82h10.031c.904.052 1.65.657 1.847 1.478v10.766h.202c3.027-7.602 7.274-11.243 14.744-11.243 4.85 0 9.599 1.757 12.63 6.558 2.831 4.466 2.831 11.984 2.831 17.392v49.318c-.117 1.021-.959 1.82-1.99 1.82h-10.835c-.972-.073-1.779-.827-1.934-1.82V42.268c0-6.558.742-16.142-7.316-16.142-2.831 0-5.426 1.895-6.73 4.798-1.614 3.642-1.816 7.284-1.816 11.344v41.323c-.024 1.118-.968 2.01-2.14 2.01l.234.022zM284.752 49.123c0 4.159.101 7.602-1.992 11.288-1.699 3.037-4.397 4.932-7.395 4.932-4.095 0-6.493-3.123-6.493-7.736 0-9.09 8.146-10.742 15.88-10.742v2.258zm10.79 26.068c-.708 1.002-1.743 1.069-2.547.4-3.576-2.972-4.227-4.346-6.195-7.174-5.932 6.045-10.125 7.87-17.775 7.87-9.098 0-16.164-5.61-16.164-16.821 0-8.76 4.734-14.726 11.531-17.633 5.865-2.577 14.061-3.037 20.32-3.744v-1.398c0-2.577.202-5.61-1.312-7.87-1.312-1.982-3.842-2.803-6.066-2.803-4.126 0-7.799 2.111-8.711 6.491-.202.972-.875 1.895-1.816 1.94l-10.418-1.122c-.875-.198-1.852-1.002-1.614-2.442C257.172 19.478 269.466 15 280.49 15c5.628 0 12.986 1.504 17.415 5.784 5.628 5.277 5.088 12.316 5.088 19.965v18.079c0 5.437 2.245 7.825 4.363 10.762.741 1.027.876 2.258-.034 3.037-2.273 1.895-6.297 5.415-8.511 7.391l-.034-.011-.235.184zM89.825 49.123c0 4.159.101 7.602-1.992 11.288-1.699 3.037-4.397 4.932-7.395 4.932-4.095 0-6.493-3.123-6.493-7.736 0-9.09 8.146-10.742 15.88-10.742v2.258zm10.79 26.068c-.708 1.002-1.743 1.069-2.547.4-3.576-2.972-4.227-4.346-6.195-7.174-5.932 6.045-10.125 7.87-17.775 7.87-9.098 0-16.164-5.61-16.164-16.821 0-8.76 4.734-14.726 11.531-17.633 5.865-2.577 14.061-3.037 20.32-3.744v-1.398c0-2.577.202-5.61-1.312-7.87-1.312-1.982-3.842-2.803-6.066-2.803-4.126 0-7.799 2.111-8.711 6.491-.202.972-.875 1.895-1.816 1.94l-10.418-1.122c-.875-.198-1.852-1.002-1.614-2.442C62.245 19.478 74.539 15 85.563 15c5.628 0 12.986 1.504 17.415 5.784 5.628 5.277 5.088 12.316 5.088 19.965v18.079c0 5.437 2.245 7.825 4.363 10.762.741 1.027.876 2.258-.034 3.037-2.273 1.895-6.297 5.415-8.511 7.391l-.034-.011-.235.184z" fill="#fff"/>
              </svg>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
              <img 
                src="https://brandlogos.net/wp-content/uploads/2021/10/meta-logo-512x512.png"
                alt="Meta" 
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity invert"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/505px-Apple_logo_white.svg.png?20220821122232"
                alt="Apple" 
                className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800 transition-colors">
              <img 
                src="https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg" 
                alt="Netflix" 
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
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
            {popularCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-black/50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800 hover:border-yellow-400/50"
              >
                <div className="w-16 h-16 mx-auto mb-4">
                  <lord-icon
                    src={
                      category.name === 'Web Development' ? "https://cdn.lordicon.com/wloilxuq.json" :
                      category.name === 'Graphic Design' ? "https://cdn.lordicon.com/iltqorsz.json" :
                      category.name === 'Content Writing' ? "https://cdn.lordicon.com/puvaffet.json" :
                      category.name === 'Digital Marketing' ? "https://cdn.lordicon.com/udwhdpod.json" :
                      category.name === 'Video & Animation' ? "https://cdn.lordicon.com/hciqteio.json" :
                      "https://cdn.lordicon.com/xhbsnkyp.json" // Mobile Development
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
              <p className="text-gray-600">
                Describe your project and set your budget
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Proposals</h3>
              <p className="text-gray-600">
                Receive proposals from qualified freelancers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Work</h3>
              <p className="text-gray-600">
                Choose a freelancer and get your work done
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
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