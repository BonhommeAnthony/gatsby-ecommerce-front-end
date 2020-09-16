import React from "react"
import "./Main.css"

import Shoe1 from "../../images/shoe-1.png"
import Shoe2 from "../../images/shoe-2.png"
import Shoe3 from "../../images/shoe-3.png"

const Main = ({ data }) => {
  return (
    <main>
      <section className="featured">
        <div className="container">
          <h2 className="section-title">Featured products</h2>
          <div className="split">
            <a href="#" className="featured__item">
              <img src={Shoe1} alt="" className="featured__img" />
              <p className="featured__details">
                <span className="price">$99</span>Shoe name
              </p>
            </a>
            <a href="#" className="featured__item">
              <img src={Shoe2} alt="" />
              <p className="featured__details">
                <span className="price">$99</span>Shoe name
              </p>
            </a>
            <a href="#" className="featured__item">
              <img src={Shoe3} alt="" className="featured__img" />
              <p className="featured__details">
                <span className="price">$99</span>Shoe name
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main
