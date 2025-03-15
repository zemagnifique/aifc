import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="inline-block bg-[#171717] bg-opacity-60 px-4 py-2 rounded-full">
      <div className="flex items-center text-white space-x-4">
        <div className="flex flex-col items-center">
          <span className="font-bebas text-xl">{formatNumber(timeLeft.days)}</span>
          <span className="text-xs uppercase">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bebas text-xl">{formatNumber(timeLeft.hours)}</span>
          <span className="text-xs uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bebas text-xl">{formatNumber(timeLeft.minutes)}</span>
          <span className="text-xs uppercase">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bebas text-xl">{formatNumber(timeLeft.seconds)}</span>
          <span className="text-xs uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
}
