"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Option } from "./option";

interface Props {
  option: { name: string; value: string };
  facet: { name: string; value: string };
}

const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function FilterOption({ facet, option }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeOptions = searchParams.getAll(facet.value);
  const active = activeOptions.includes(option.value);
  const currentParams = Array.from(searchParams.entries());
  const newParams = active
    ? currentParams.filter(
        ([key, value]) => key !== facet.value || value !== option.value,
      )
    : [...currentParams, [facet.value, option.value]];

  const href = createUrl(pathname, new URLSearchParams(newParams));

  return (
    <Option active={active} href={href}>
      {option.name}
    </Option>
  );
}
