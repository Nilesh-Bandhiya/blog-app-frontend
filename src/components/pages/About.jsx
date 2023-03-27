import React from 'react'
import './About.css'

const About = () => {
  return (
    <div>
      <section className="about-us">
        <div className="about">
          <img src="../about.png" alt='pic' className="pic" />
          <div className="text">
            <h2 className='text-h2' >About Us</h2>
            <h5 className='text-h5' >Front-end Developer & <span>Designer</span></h5>
            <p className='text-p'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita natus ad sed harum itaque ullam enim quas, veniam accusantium, quia animi id eos adipisci iusto molestias asperiores explicabo cum vero atque amet corporis! Soluta illum facere consequuntur magni. Ullam dolorem repudiandae cumque voluptate consequatur consectetur, eos provident necessitatibus reiciendis corrupti!</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About