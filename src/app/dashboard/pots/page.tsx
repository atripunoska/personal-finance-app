import PotCard from "@/app/ui/pots/card";
import { Button } from "@/components/ui/button";
import { fetchPots } from "@/lib/data";
import React from "react";

export default async function Pots() {
  const pots = await fetchPots();
  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-bold font-public-sans text-3xl mb-3">Pots</h3>
        <Button className="font-bold font-public-sans">+ Add New Pot</Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {pots.map((item) => {
          return (
            <PotCard
              category={item.theme}
              title={item.name}
              key={item.name}
              target={item.target}
              total={item.total}
            />
          );
        })}
      </div>
    </>
  );
}
