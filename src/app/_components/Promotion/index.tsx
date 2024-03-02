"use client"

import React, { useEffect, useState } from 'react'
import classes from './index.module.scss'

const Promotion = () => {

  // Set your target date (current date + 7 days)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  // Calculate the initial time until the target date
  const calculateTimeUntilTarget = () => {
    const now = new Date();
    const timeDifference = Number(targetDate) - Number(now);

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Function to update the time state
    const updateTime = () => {
      const timeUntilTarget = calculateTimeUntilTarget();
      setTime(timeUntilTarget);
    };

    // Update the time immediately on mount
    updateTime();

    // Update the time every second
    const timerInterval = setInterval(updateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // Empty dependency array means the effect runs once on mount

  return (
    <section className={classes.Promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every purchase comes with exclusive perks and offers, making this month a celebration of savvy choices and amazing deals. Don't miss out! 🎁🛒          
        </p>

        <ul className={classes.stats}>
          <StatBox value={time.days} label='Days' />
          <StatBox value={time.hours} label='Hours' />
          <StatBox value={time.minutes} label='Minutes' />
          <StatBox value={time.seconds} label='Seconds' />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value}:{ label: string, value: number}) => {
  return(
    <li className={classes.statBox}>
      <h4>{value}</h4>
      <label>{label}</label>
    </li>
  )
}

export default Promotion
