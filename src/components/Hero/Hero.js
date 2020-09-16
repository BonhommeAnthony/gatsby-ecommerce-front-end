import { Link } from "gatsby"
import React from "react"
import "./Hero.css"

const Hero = () => {
  return (
    <header className="hero">
      <div className="container spacing">
        <h1 className="primary-title">AMAZING SHOES AT AN AMAZING PRICE</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe,
          ipsa distinctio nostrum modi illo.
        </p>
        <Link href="#" className="btn">
          See what we have
        </Link>
      </div>
    </header>
  )
}

export default Hero
