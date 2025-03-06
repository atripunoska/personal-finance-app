"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { Modal } from "../modal";
import { USDollar } from "@/lib/utils";

export default function PotCard({
  category,
  title,
  target,
  total,
}: {
  category: string;
  title: string;
  target: number;
  total: number;
}) {
  const progress = (total / target) * 100;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card className="p-4">
      <div className="flex gap-3 items-center">
        <div
          className="w-4 h-4 rounded-full flex"
          style={{ backgroundColor: `${category}` }}
        ></div>
        <h3 className="font-bold text-xl text-grey-900 font-public-sans">
          {title}
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="text-grey-300 font-bold font-public-sans">
          Total Saved
        </div>
        <div className="text-grey-900 font-bold text-3xl font-public-sans">
          {USDollar.format(total)}
        </div>
      </div>
      <Progress value={progress} indicatorColor={category} />
      <div className="flex justify-between">
        <div className="text-grey-300 font-bold font-public-sans">
          {Math.round(progress * 100) / 100}%
        </div>
        <div className="text-grey-300 font-semibold font-public-sans">
          Total savings of {USDollar.format(total)}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Button
          className="font-bold font-public-sans text-grey-900 bg-grey-100 flex flex-grow border-2 border-grey-100 hover:bg-white hover:text-black hover:border-2"
          onClick={() => setModalOpen(true)}
        >
          + Add Money
        </Button>
        <Button className="font-bold font-public-sans text-grey-900 bg-grey-100 border-2 border-grey-100 flex flex-grow hover:bg-white hover:text-black hover:border-2">
          Withdraw
        </Button>
      </div>

      <Modal
        open={modalOpen}
        titleContent={<h1> Close </h1>}
        secondaryFn={() => setModalOpen(false)}
        content={
          <>
            <h2>This is a modal</h2>
            <p>
              You can close it by pressing Escape key, pressing close, or
              clicking outside the modal.
            </p>
          </>
        }
      />
    </Card>
  );
}
