import React from "react";
import Toggle, { ToggleProvider } from "../ui/Toggle";
import PaymentCard from "../ui/Paymentcard";

const Payment = () => {
  return (
    <div className="w-full flex flex-col items-center relative text-black rounded-t-[24px] border-t border-black/10 justify-center gap-[48px] p-[48px] ">
      <h4 className="sm:text-[56px] text-[42px]  font-semibold">
        Find your Plan.
      </h4>
      <div className="absolute top-0 left-0 w-full h-full px-[96px]">
        <div className="w-full h-full border-l border-r border-black/10"></div>
      </div>
      <ToggleProvider>
        <Toggle />
        <div className="flex gap-[24px] z-20 sm:flex-row flex-col items-end">
          <PaymentCard
            tier="Free"
            price="0"
            buttontype="secondary"
            bulletpoints={[
              "AI sentence completion",
              "Basic rewrite & stylize tools",
              "Share & Collaborate",
              "Up to 15 References",
            ]}
            background="bg-white"
            image="/assets/example.png"
            buttontext="Get Started"
            delay={0.0}
            className="border border-black/10 overflow-hidden"
          />
          <div className="w-full pb-[var(--space-20)]">
            <PaymentCard
              tier="Pro"
              price="10"
              bulletpoints={[
                "Everything in Free",
                "Unlimited reference imports",
                "Advanced rewrite & tone adjustment",
                "Priority support",
              ]}
              buttontype="primary"
              background="white"
              image="/assets/example.png"
              delay={0.1}
              buttontext="Subscribe"
              className="border border-black/10 overflow-hidden"
            />
          </div>
          <PaymentCard
            tier="Writer"
            price="25"
            buttontype="secondary"
            bulletpoints={[
              "Everything in Pro",
              "Unlimited reference imports",
              "Advanced rewrite & tone adjustment",
              "Priority support",
            ]}
            background="bg-white"
            image="/assets/example.png"
            buttontext="Subscribe"
            delay={0.2}
            className="border border-black/10 overflow-hidden"
          />
        </div>
      </ToggleProvider>
    </div>
  );
};

export default Payment;
