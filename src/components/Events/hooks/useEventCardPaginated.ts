import { useMemo, useState } from "react";
import { getEventsByYear } from "../../../lib/dateUtils";
import { MyEvent } from "../../../lib/Event/interface";

const EVENTS_PER_PAGE = 10;

export const useEventCardPaginated = (
  events: MyEvent[],
  isInThePast: boolean
) => {
  const [currentBatch, setCurrentBatch] = useState(0);

  const { eventsByYear, allYears } = useMemo(() => {
    if (isInThePast) {
      events.reverse();
    }
    const displayedEvents = events.slice(
      currentBatch * EVENTS_PER_PAGE,
      (currentBatch + 1) * EVENTS_PER_PAGE
    );

    const eventsByYear = getEventsByYear(displayedEvents);
    const allYears = Object.keys(eventsByYear).sort();
    if (isInThePast) {
      allYears.reverse();
    }
    return { eventsByYear, allYears };
  }, [events, currentBatch]);

  const nbOfBatch = Math.ceil(events.length / EVENTS_PER_PAGE);

  const displayNextBatch =
    currentBatch < nbOfBatch - 1
      ? () => setCurrentBatch(currentBatch + 1)
      : undefined;

  const displayPreviousBatch =
    currentBatch > 0 ? () => setCurrentBatch(currentBatch - 1) : undefined;

  return { eventsByYear, allYears, displayNextBatch, displayPreviousBatch };
};
