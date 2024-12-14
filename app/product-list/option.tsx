import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Link> {
  active?: boolean;
}

export function Option({ active, ...rest }: Props) {
  return <Link className={clsx(active && "font-bold")} {...rest}></Link>;
}
