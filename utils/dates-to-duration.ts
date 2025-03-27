import { intervalToDuration } from 'date-fns';

export const datesToDuration = (
  startedAt: Date | null | undefined,
  completedAt: Date | null | undefined,
) => {
  if (!startedAt || !completedAt) return null;

  const timeElapsed = completedAt.getTime() - startedAt.getTime();
  if (timeElapsed < 1000) return `${timeElapsed}ms`;

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return `${duration.seconds} seconds`;
};
