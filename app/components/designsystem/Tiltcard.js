import { Tilt } from "react-tilt";
import Button from "./button";
import { motion } from "framer-motion";
const defaultOptions = {
  reverse: false,
  max: 12,
  perspective: 1200,
  scale: 1,
};
const Tiltcard = ({
  tagName,
  title,
  description,
  icon,
  buttonText,
  tagColor,
  tagBgColor,
  delay,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ once: true, duration: 0.3, delay: delay }}
      viewport={{ amount: 0.2, once: true }}
    >
      <Tilt
        options={defaultOptions}
        className={`w-full sm:aspect-square text-black flex shadow-md border backdrop-blur-lg border-white/10 shadow-black/10 flex-col gap-[16px] p-[24px] rounded-[12px] justify-between overflow-hidden bg-white ${className}`}
      >
        <div className=" w-full justify-between flex items-center">
          <div
            className={`${tagBgColor} px-[12px] py-[4px] text-[14px] rounded-[4px]`}
          >
            <p className={`${tagColor}`}>{tagName}</p>
          </div>
          <div className="w-[35px] h-[35px] rainbow-radial text-black rounded-[4px] flex items-center justify-center">
            <i className="text-[16px]">{icon}</i>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <h1 className="text-[21px] font-satoshi font-medium">{title}</h1>
          <p className="text-[14px]">{description}</p>
          <div className="flex w-full justify-end items-center gap-[12px]">
            <Button variant="tertiary" size="medium">
              <p>{buttonText}</p>
            </Button>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};
export default Tiltcard;
