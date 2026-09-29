import confetti from 'canvas-confetti';

export const triggerRescueConfetti = () => {
  try {
    // Burst 1: Main emergency burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899']
    });

    // Burst 2: Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ef4444', '#f97316', '#eab308']
      });
    }, 200);

    // Burst 3: Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#06b6d4', '#6366f1']
      });
    }, 400);
  } catch (err) {
    console.warn('Confetti error:', err);
  }
};
