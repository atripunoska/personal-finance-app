import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Pot, PotsWidgetProps } from "@/lib/definitions";
import { USDollar } from "@/lib/utils";

export default function PotsWidget({ pots }: PotsWidgetProps) {
  let potsTotal = 0;
  return (
    <Card className="mb-3">
      <CardContent>
        <div className="flex justify-between mb-3">
          <h2 className="text-xl text-grey-900 font-semibold ">Pots</h2>
          <Link
            href="/dashboard/pots"
            className="text-muted-foreground text-sm  font-medium"
          >
            View all
          </Link>
        </div>
        <div className="flex justify-between flex-row gap-4 flex-row-reverse content-between">
          <div className="grid grid-cols-2 mb-3 flex-1 content-between ">
            {pots.map((item: Pot, index: number) => {
              potsTotal += item.total;

              if (index > 3) return;

              return (
                <div key={index} className="flex gap-2 mb-3 align-center ">
                  <span
                    className={`w-[5px] h-auto block rounded-b-md rounded-t-md`}
                    style={{ backgroundColor: item.theme }}
                  ></span>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      {item.name}{" "}
                    </span>
                    <div className="text-grey-900 font-bold  ">
                      {USDollar.format(item.total)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-beige-100 p-3 rounded-2xl flex flex-col w-full  flex-1 items-center justify-center">
            <div className="flex items-center justify-center content-center gap-3">
              <Image
                src="./assets/images/icon-pot.svg"
                alt={"Total saved icon"}
                width={40}
                height={40}
                loading="lazy"
              />
              <div className="flex flex-col pl-3">
                <span className="text-gray-400 mb-3">Total savings</span>
                <span className="text-gray-900 font-extrabold  text-4xl">
                  {USDollar.format(potsTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
