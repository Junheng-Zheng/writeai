import React from "react";
import Buttonarrow from "./Buttonarrow";
import Star from "./Star";
import { motion } from "framer-motion";
import { useToggle } from "./Toggle";

const Paymentcard = ({
  tier,
  price,
  image,
  bulletpoints,
  buttontype,
  background,
  delay,
  buttontext,
}) => {
  const { yearly } = useToggle();
  const yearlyPrice = Math.round(price * 12 * 0.9);
  const displayPrice = yearly ? yearlyPrice : price;
  const billingPeriod = yearly ? "/Year" : "/Month";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: delay,
        },
      }}
      viewport={{ once: true }}
      className={`w-full h-fit border-[0.5px] border-white bg-white relative rounded-[var(--radius-20)] overflow-hidden flex flex-col items-center gap ${background}`}
    >
      <img
        src="/assets/noise.jpeg"
        alt="landingbg"
        className="absolute top-0 left-0 w-full h-full opacity-8 object-cover"
      />
      <div className="flex w-full z-200 p-[var(--space-25)] flex-col gap-[var(--space-15)] sm:gap-[var(--space-20)]">
        <div className="flex items-center gap-[var(--space-8)]">
          <img
            src="/assets/icon.png"
            alt="logo"
            className="w-[30px] h-[30px]"
          />
          <h3 className="text-white text-[27px] sm:text-[32px] font-semibold">
            {tier}
          </h3>
        </div>
        <h4 className="text-white text-[32px] sm:text-[42px] font-semibold">
          ${displayPrice}
          {billingPeriod}
        </h4>
        {yearly && price > 0 && (
          <p className="text-[var(--color-blue-light)] text-[14px] bg-[var(--color-light-blue)] w-fit rounded-full px-[var(--space-10)] py-[var(--space-5)]">
            Save 10% with yearly billing
          </p>
        )}
        <div className="flex flex-col gap-[var(--space-10)] text-white">
          {bulletpoints.map((point, index) => (
            <div key={index} className="flex items-center gap-[var(--space-5)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="#ffffff"
              >
                <path
                  fill="#ffffff"
                  fillRule="evenodd"
                  d="M7.935.655c-.318-.873-1.552-.873-1.87 0L4.622 4.622L.655 6.065c-.873.318-.873 1.552 0 1.87l3.967 1.443l1.443 3.967c.318.873 1.552.873 1.87 0l1.443-3.967l3.967-1.443c.873-.318.873-1.552 0-1.87L9.378 4.622z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p>{point}</p>
            </div>
          ))}
        </div>
        <Buttonarrow variant={buttontype}>{buttontext}</Buttonarrow>
      </div>
      <div className="w-full z-200 h-full flex items-end pl-[var(--space-25)] justify-center ">
        <img
          src={image}
          alt="example"
          className="sm:h-[250px] h-[150px] w-full object-cover rounded-tl-[var(--radius-20)]"
        />
      </div>
    </motion.div>
  );
};

export default Paymentcard;
