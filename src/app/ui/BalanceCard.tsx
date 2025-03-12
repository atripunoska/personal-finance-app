import { BalanceCardProps } from "@/lib/definitions";
import { USDollar } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

export default function BalanceCard({ type, id, amount }: BalanceCardProps) {
  return (
    <div
      className={clsx({
        "rounded-md p-4 justify-content flex flex-col flex-1 ": true,
        "bg-gray-900 text-white": type === "current",
        "bg-white text-gray-900": type !== "current",
      })}
      key={id}
    >
      <p className="capitalize font-light text-sm mb-3">
        {" "}
        {type} {type === "current" && " Balance"}
      </p>
      <div className="text-2xl font-bold"> {USDollar.format(amount)}</div>
    </div>
  );
}
