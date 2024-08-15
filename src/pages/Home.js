import React from 'react';
import Typewriter from "typewriter-effect";
import '../CSS/GetStarted.css' 
import {Link} from 'react-router-dom'

const Home=()=>{
    return <div className='log'>
        
        <div className="left" id='Homeleft'>
        
        
        <Typewriter 
 
 onInit={(typewriter) => {
     typewriter
         .typeString("Welcome to TeleMeds!!")
         .pauseFor(1900)
         .deleteAll()
         .typeString("You Need to Login or Signup First")
         .start();
 }}
/>
    </div>
    <div className="right">
        <div className="container">
            <h1 className='h1'>Get Started</h1>
            <button className="button"><Link to='/login' className='Link'>Log in</Link></button>
            <button className="button"><Link to='/register' className='Link'>Sign up</Link></button>
        </div>
        <div className="bottoms">
            <button className="links">Terms and Conditions</button>
            <button className="links">Privacy policy</button>
        </div>
    </div>
    </div>
}


export default Home;