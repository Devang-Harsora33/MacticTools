import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Link
        href={
          "https://www.google.com/maps/place/18%C2%B056'59.3%22N+72%C2%B050'00.6%22E/@18.9498056,72.8335,17z/data=!4m4!3m3!8m2!3d18.9498056!4d72.8335?g_ep=Eg1tbF8yMDI1MDYyM18wIJvbDyoASAJQAg%3D%3D"
        }
        target="_blank"
      >
        <p>
          Mactic Tools: Shop No 101, 1st Floor, 46-Shamsi Heights, Sarang
          Street, Khokha Bazar Mumbai-400003
        </p>
      </Link>
    </div>
  );
};

export default Footer;
