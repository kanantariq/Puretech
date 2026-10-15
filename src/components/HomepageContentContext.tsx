'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { DEFAULT_HOME_PAGE_CONTENT, type HomePageContent } from '../data/homepage';

const HomepageContentContext = createContext<HomePageContent>(DEFAULT_HOME_PAGE_CONTENT);

export function HomepageContentProvider({ content, children }: { content: HomePageContent; children: ReactNode }) {
  return <HomepageContentContext.Provider value={content}>{children}</HomepageContentContext.Provider>;
}

export function useHomepageContent() {
  return useContext(HomepageContentContext);
}
