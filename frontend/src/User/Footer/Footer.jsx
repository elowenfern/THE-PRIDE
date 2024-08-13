import React from 'react';
import w12 from '../../Asset/Footer/w12.jpg';
import Logo from '../../Asset/Logo.png';
import { FaInstagram, FaFacebook, FaLinkedinIn, FaLocationArrow } from 'react-icons/fa';
 
 
 const Footer = () => {
   const FooterLinks = [
     { title: 'Home', link: '#' },
     { title: 'About', link: '#' },
     { title: 'Courses', link: '#' },
     { title: 'Contact', link: '#' },
     { title: 'FAQ', link: '#' },
   ];
 
   return (
     <div className="relative text-white py-16">
       {/* Background Pattern */}
       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75"></div>
       <svg
         className="absolute inset-0 w-full h-full"
         xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="none"
         viewBox="0 0 100 100"
         opacity="0.2"
       >
         <polygon fill="#FFF" points="50,0 100,0 100,100" />
         <polygon fill="#FFF" points="0,100 50,100 0,0" />
       </svg>
       
       <div className="relative container mx-auto px-4">
         {/* Footer content */}
         <div className="grid md:grid-cols-3 gap-8">
           {/* Company details */}
           <div className="px-4 space-y-4">
             <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
               <img src={Logo} alt="Logo" className="max-w-[50px] rounded-full" />
               THE PRIDE
             </h1>
             <p className="text-gray-200">
               "I taught myself how to program computers when I was a kid, bought my first computer when I was 10, and sold my first commercial program when I was 12." – Elon Musk
             </p>
           </div>
 
           {/* Link details */}
           <div className="px-4 space-y-4">
             <h1 className="text-3xl font-bold mb-4">Important Links</h1>
             <ul className="flex flex-col gap-3">
               {FooterLinks.map((link) => (
                 <li
                   className="cursor-pointer hover:text-primary hover:translate-x-2 duration-300"
                   key={link.title}
                 >
                   <a href={link.link} className="text-gray-200 hover:text-white">{link.title}</a>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Social links */}
           <div className="px-4 space-y-4">
             <h1 className="text-3xl font-bold mb-4">Connect with Us</h1>
             <div className="flex space-x-6 mb-4">
               <a href="#" aria-label="Instagram" className="hover:text-primary">
                 <FaInstagram className="text-3xl transition-transform duration-300 transform hover:scale-110" />
               </a>
               <a href="#" aria-label="Facebook" className="hover:text-primary">
                 <FaFacebook className="text-3xl transition-transform duration-300 transform hover:scale-110" />
               </a>
               <a href="#" aria-label="LinkedIn" className="hover:text-primary">
                 <FaLinkedinIn className="text-3xl transition-transform duration-300 transform hover:scale-110" />
               </a>
             </div>
             <div className="flex items-center gap-3 text-gray-200">
               <FaLocationArrow />
               <p>HSR Layout, Bangalore</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default Footer;
 