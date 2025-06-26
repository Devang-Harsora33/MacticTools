import React from "react";
import Image from "next/image";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";

const features = [
  {
    icon: <ConstructionOutlinedIcon sx={{ fontSize: 32, color: "#73573f" }} />,
    title: "Empower Craftsmen",
    desc: "We equip skilled artisans and builders with the finest tools, enabling them to bring their visions to life with unparalleled precision and efficiency.",
  },
  {
    icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 32, color: "#73573f" }} />,
    title: "Cutting-Edge Performance",
    desc: "Our dedication to innovation ensures that our tools integrate advanced technology, delivering superior performance and functionality for every project.",
  },
  {
    icon: <AccessTimeOutlinedIcon sx={{ fontSize: 32, color: "#73573f" }} />,
    title: "Built to Last",
    desc: "MACTIC tools are engineered for longevity, designed to withstand the rigours of continuous use and stand the test of time, providing lasting value.",
  },
  {
    icon: <Diversity3OutlinedIcon sx={{ fontSize: 32, color: "#73573f" }} />,
    title: "Community Focused",
    desc: "We foster a community of makers and professionals, supporting growth, collaboration, and shared success in every project.",
  },
];

const MissionSection = () => {
  return (
    <section className="w-full bg-[#fdfbf7] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto gap-10">
        <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
          <div className="relative w-full md:block hidden aspect-[9/12] max-w-lg rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/homepage3.webp" // Placeholder image
              alt="Craftsman at work"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-8 order-1 lg:order-2">
          <h2 className="text-5xl font-bold text-[#73573f] mb-2 text-center lg:text-left">
            Our Mission: Empowering Craftsmanship
          </h2>
          <div className="relative w-full block md:hidden aspect-[9/12] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/homepage3.jpg" // Placeholder image
              alt="Craftsman at work"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left gap-2"
              >
                <div className="mb-2 opacity-70 scale-110 hover:scale-125 transition-all duration-300 ease-in-out">
                  {feature.icon}
                </div>
                <h3 className="text-3xl md:text-2xl font-semibold text-[#73573f] mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#3a3a3a] text-xl md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
