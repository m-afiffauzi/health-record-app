"use client";

import { SWRConfig } from "swr";
import fetcher from "../libs/fetcher";

type Props = {
  children?: React.ReactNode;
};

export function SWRProvider({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
