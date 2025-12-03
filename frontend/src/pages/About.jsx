const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Oasis E-Commerce</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Oasis E-Commerce is a modern, full-featured online marketplace built with the MERN stack
            (MongoDB, Express.js, React, and Node.js). We provide a platform where buyers and sellers
            can connect to exchange quality products.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to create a seamless e-commerce experience that empowers both buyers and
            sellers. We strive to provide a secure, user-friendly platform with modern features including
            real-time cart management, wishlist functionality, and integrated payment processing.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              User authentication and profile management
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Product browsing with search and filter capabilities
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Shopping cart and wishlist functionality
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Secure payment processing with Stripe
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Order history and tracking
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Seller dashboard for product management
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• React with Hooks</li>
                <li>• Redux Toolkit for state management</li>
                <li>• React Router for navigation</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Stripe for payment processing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Node.js & Express.js</li>
                <li>• MongoDB with Mongoose ODM</li>
                <li>• JWT for authentication</li>
                <li>• Bcrypt for password hashing</li>
                <li>• Multer for file uploads</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
