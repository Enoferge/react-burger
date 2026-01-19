import { throttle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

type TUseTabScrollProps<T extends string> = {
  initialActiveTab: T;
};

type TUseTabScrollResult<T extends string> = {
  ingredientsSectionRef: React.RefObject<HTMLDivElement | null>;
  tabsContainerRef: React.RefObject<HTMLElement | null>;
  activeTab: T;
  setSectionRef: (tab: T, element: HTMLDivElement | null) => void;
  handleTabClick: (tab: T) => void;
};

export const useTabScroll = <T extends string>({
  initialActiveTab,
}: TUseTabScrollProps<T>): TUseTabScrollResult<T> => {
  const [activeTab, setActiveTab] = useState<T>(initialActiveTab);
  const ingredientsSectionRef = useRef<HTMLDivElement | null>(null);
  const tabsContainerRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Map<T, HTMLDivElement>>(new Map());
  const isScrollingProgrammaticallyRef = useRef<boolean>(false);

  const setSectionRef = (tab: T, element: HTMLDivElement | null): void => {
    if (element) {
      sectionRefs.current.set(tab, element);
    } else {
      sectionRefs.current.delete(tab);
    }
  };

  const handleTabClick = (tab: T): void => {
    setActiveTab(tab);
    const sectionElement = sectionRefs.current.get(tab);
    if (sectionElement) {
      isScrollingProgrammaticallyRef.current = true;
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        isScrollingProgrammaticallyRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = throttle((): void => {
      if (isScrollingProgrammaticallyRef.current) {
        return;
      }

      if (!tabsContainerRef.current) {
        return;
      }

      const tabContainerBottom = tabsContainerRef.current.getBoundingClientRect().bottom;

      const distances = Array.from(sectionRefs.current.entries()).map(
        ([tab, section]) => {
          const top = section.getBoundingClientRect().top;
          const distance = Math.abs(top - tabContainerBottom);
          return { tab, distance };
        }
      );

      const closestTab = distances.reduce((prev, current) =>
        prev.distance < current.distance ? prev : current
      ).tab;

      setActiveTab((prevTab) => {
        return closestTab !== prevTab ? closestTab : prevTab;
      });
    }, 100);

    ingredientsSectionRef.current?.addEventListener('scroll', handleScroll);

    return (): void => {
      ingredientsSectionRef.current?.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return {
    ingredientsSectionRef,
    tabsContainerRef,
    activeTab,
    setSectionRef,
    handleTabClick,
  };
};
