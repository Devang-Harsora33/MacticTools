import { RefObject } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

export const useAutoplayProgress = (
  emblaApi: EmblaCarouselType | undefined,
  progressNode: RefObject<HTMLDivElement>
) => {
  const showAutoplayProgress = emblaApi && progressNode.current;
  return { showAutoplayProgress };
}; 