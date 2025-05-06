import React from "react";
import Toggle, { ToggleProvider } from "../ui/Toggle";
import PaymentCard from "../ui/Paymentcard";

const Payment = () => {
  return (
    <div className="overflow-hidden relative rounded-t-[var(--radius-25)] gap-[var(--space-25)] sm:gap-[var(--space-50)] py-[var(--space-50)] px-[var(--space-25)] sm:px-[var(--space-100)] w-full flex flex-col flex-1 payment-bg items-center justify-center">
      <img
        src="/assets/noise.jpeg"
        alt="landingbg"
        className="absolute top-0 left-0 w-full h-full opacity-4 object-cover"
      />
      <h4 className="sm:text-[65px] text-[42px] text-white font-bold">
        Find your Plan.
      </h4>
      <ToggleProvider>
        <Toggle />
        <div className="flex gap-[var(--space-20)] sm:flex-row flex-col items-end">
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
            background="paymentcard-bg-secondary"
            image="/assets/example.png"
            buttontext="Get Started"
            delay={0.0}
          />
          <div className="w-full pb-[var(--space-20)]">
            <PaymentCard
              tier="Pro"
              price="25"
              bulletpoints={[
                "Everything in Free",
                "Unlimited reference imports",
                "Advanced rewrite & tone adjustment",
                "Priority support",
              ]}
              buttontype="primary"
              background="paymentcard-bg-primary"
              image="/assets/example.png"
              delay={0.1}
              buttontext="Subscribe"
            />
          </div>
          <PaymentCard
            tier="Write"
            price="25"
            buttontype="primary"
            bulletpoints={[
              "Everything in Pro",
              "Unlimited reference imports",
              "Advanced rewrite & tone adjustment",
              "Priority support",
            ]}
            background="paymentcard-bg-secondary"
            image="/assets/example.png"
            buttontext="Subscribe"
            delay={0.2}
          />
        </div>
      </ToggleProvider>
    </div>
  );
};

export default Payment;
