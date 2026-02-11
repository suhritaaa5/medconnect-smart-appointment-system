import React from 'react'

const About = () => {
  return (
    <div className="px-6 md:px-20 py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          About <span className="text-cyan-600">MedConnect</span>
        </h2>
        {/* Main Card */}
        <div className="mt-10 bg-white border border-gray-200 shadow-sm rounded-2xl p-8 md:p-10">

          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            MedConnect is a modern healthcare appointment platform designed to
            bridge the gap between patients and doctors. Our mission is simple —
            make quality healthcare accessible, organized, and effortless.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-6 text-justify">
            With MedConnect, users can discover verified doctors, explore their
            profiles, check real-time availability, and book appointments with
            just a few taps. We focus on providing a seamless experience so
            patients spend less time waiting and more time getting the care they
            need.
          </p>

           <p className="text-gray-700 leading-relaxed text-lg mt-6 text-justify">
            Built with trust, transparency, and ease of use at the core,
            MedConnect brings technology and healthcare together to create a
            smarter and more connected patient experience.
          </p>
          
          <div className="mt-10 grid sm:grid-cols-2 gap-6">

            <div className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 bg-sky-600 rounded-full"></span>
              <p className="text-gray-900 font-medium text-lg">
                Verified and Trusted Doctors
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 bg-sky-600 rounded-full"></span>
              <p className="text-gray-900 font-medium text-lg">
                Real-Time Appointment Slots
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 bg-sky-600 rounded-full"></span>
              <p className="text-gray-900 font-medium text-lg">
                Seamless Booking Experience
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 bg-sky-600 rounded-full"></span>
              <p className="text-gray-900 font-medium text-lg">
                Secure & User-Friendly Platform
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
  


export default About
