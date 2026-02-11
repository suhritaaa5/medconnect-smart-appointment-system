import React from 'react'

const Contact = () => {
  return (
     <div className="px-6 md:px-20 py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Contact <span className="text-cyan-600">Us</span>
        </h2>

        {/* Card */}
        <div className="mt-10 bg-white border border-gray-200 shadow-sm rounded-2xl p-8 md:p-10">

          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Have questions or need help with MedConnect?  Feel free to reach out.
            We’re always here to support you.
          </p>

          {/* Contact Info */}
          <div className="mt-10 grid sm:grid-cols-2 gap-8">

            <div>
              <p className="text-gray-900 font-semibold text-lg">Email</p>
              <p className="text-gray-700 mt-1">support@medconnect.com</p>
            </div>

            <div>
              <p className="text-gray-900 font-semibold text-lg">Phone</p>
              <p className="text-gray-700 mt-1">+91 123456789</p>
            </div>

            <div>
              <p className="text-gray-900 font-semibold text-lg">Location</p>
              <p className="text-gray-700 mt-1">Pune, Maharashtra, India</p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-900">
              Send us a Message
            </h3>

            <form className="mt-6 grid gap-6">

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white font-semibold py-3 rounded-xl hover:bg-sky-700 transition-all"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  
  )
}

export default Contact
