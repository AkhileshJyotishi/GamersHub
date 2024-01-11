// components/GDPRPolicy.tsx

import React from "react"
import Head from "next/head"
// import Link from "next/link"

const GDPRPolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-8 mx-auto bg-background max-w-7xl">
      <Head>
        <title>GameCreators.io - GDPR Policy</title>
      </Head>
      <div className="container p-8 mx-auto rounded shadow-lg">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary">About Us</h1>
        </header>
        <div className="w-[80%] mx-auto">
          <section className="mb-8 text-lg">
            <p>
              Welcome to GameCreators.io, where passion meets innovation in the ever-evolving realm
              of game development. Founded on the principles of creativity, collaboration, and
              cutting-edge technology, our platform serves as a hub for aspiring and seasoned game
              creators alike.
            </p>
          </section>

          <section className="mb-8 text-lg">
            <p>
              At the heart of GameCreators.io is a diverse community of visionaries, developers,
              artists, and enthusiasts united by a shared love for the artistry and complexity of
              game design. Our journey began with a simple yet powerful idea: to provide a space
              where individuals with a passion for gaming could come together, learn, create, and
              showcase their talents.
            </p>
          </section>

          <section className="mb-8 text-lg">
            <p>
              Our team is comprised of seasoned professionals from various corners of the gaming
              industry, including developers who have worked on blockbuster titles, artists whose
              imaginations know no bounds, and experts in emerging technologies. This collective
              expertise enables us to curate a rich tapestry of resources, tutorials, and tools that
              cater to the entire spectrum of game development.
            </p>
          </section>

          {/* Add more sections as needed for different topics */}

          <section className="mb-8 text-lg">
            <p>
              As we look toward the future, GameCreators.io remains dedicated to being a beacon for
              the global game development community. Whether you're here to learn, collaborate, or
              simply be inspired, we invite you to join us on this exciting journey. Together, let's
              continue pushing the boundaries of what's possible in the world of game creation.
              Welcome to GameCreators.io, where your gaming dreams take flight.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default GDPRPolicy
