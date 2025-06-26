import React from "react";
import Image from "next/image";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

const features = [
  {
    icon: <SendOutlinedIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Vision",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: <MailOutlineOutlinedIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Mission",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim",
  },
  {
    icon: <CallOutlinedIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Goal",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit volupta tem accusa ntium eius modi tempora",
  },
  {
    icon: <InstagramIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Strategy",
    desc: "Foste natus error sit volupta tem accusa ntium eius modi tempora",
  },
];

const ContactSection = () => {
  return (
    <section className="w-full bg-[#fdfbf7] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center mb-[10rem]">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-10">
        {/* Top features row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-[#73573f] mb-1">
                {feature.title}
              </h3>
              <p className="text-[#3a3a3a] text-xl">{feature.desc}</p>
            </div>
          ))}
        </div>
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 items-center w-full">
          {/* Image on the left */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full aspect-[3/3] max-w-lg rounded-xl overflow-hidden shadow-lg bg-[#f7ecd9]">
              <Image
                src="/images/homepage6.jpg" // Placeholder image
                alt="Contact Mactic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          {/* Text and buttons on the right */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-center">
            <h2 className="text-5xl font-bold text-[#73573f] mb-2 text-left">
              Connect with MACTIC: Your Partner in Progress
            </h2>
            <div className="flex flex-col gap-4 text-xl text-[#3a3a3a]">
              <p>
                We believe in fostering strong relationships with our customers.
                At MACTIC, your satisfaction is our priority, and we are always
                here to support your projects and answer your queries.
              </p>
              <p>
                Reach out to our expert team for product advice, technical
                support, or any assistance you may need. Join the MACTIC
                community and experience the difference that dedication and
                quality make.
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <button className="bg-[#3a3a3a] text-[#fdfbf7] text-lg font-semibold rounded-full px-8 py-3 shadow hover:bg-gray-800 transition">
                Contact Us
              </button>
              <button className="bg-white text-[#73573f] text-lg font-semibold rounded-full px-8 py-3 border border-gray-400 hover:bg-gray-100 transition">
                Support Centre
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
