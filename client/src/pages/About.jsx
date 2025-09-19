import React from "react";

function About() {
  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About Dini Paradise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our story, our passion for exceptional cuisine, and the
            values that make us your perfect dining destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2020, Dini Paradise began as a dream to create a
              culinary haven where traditional flavors meet modern innovation.
              Our journey started with a simple mission: to serve exceptional
              food in a warm, welcoming atmosphere.
            </p>
            <p className="text-gray-600">
              Today, we're proud to be a cornerstone of our community, bringing
              people together through the universal language of great food and
              genuine hospitality.
            </p>
          </div>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Restaurant Image Placeholder]</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Our Mission
            </h4>
            <p className="text-gray-600">
              To create memorable dining experiences through exceptional food,
              warm service, and a welcoming atmosphere that feels like home.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Our Vision
            </h4>
            <p className="text-gray-600">
              To be the premier dining destination where every guest leaves with
              a smile, a full heart, and plans to return soon.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Our Values
            </h4>
            <p className="text-gray-600">
              Quality, authenticity, community, and hospitality are the pillars
              that guide everything we do at Dini Paradise.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
