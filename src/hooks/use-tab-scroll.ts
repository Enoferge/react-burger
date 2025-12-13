import { useRef, useState } from 'react';

type TUseTabScrollProps<T extends string> = {
  initialActiveTab: T;
};

type TUseTabScrollResult<T extends string> = {
  activeTab: T;
  setSectionRef: (tab: T, element: HTMLDivElement | null) => void;
  handleTabClick: (tab: T) => void;
};

export const useTabScroll = <T extends string>({
  initialActiveTab,
}: TUseTabScrollProps<T>): TUseTabScrollResult<T> => {
  const [activeTab, setActiveTab] = useState<T>(initialActiveTab);
  const sectionRefs = useRef<Map<T, HTMLDivElement>>(new Map());

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
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // TODO: add Observer to trigger tab change when section is visible

  return {
    activeTab,
    setSectionRef,
    handleTabClick,
  };
};
