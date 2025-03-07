"use client";
import AddPotModal from "@/app/ui/pots/AddPotModal";
import PotCard from "@/app/ui/pots/Card";
import { Button } from "@/components/ui/button";
import { fetchPots } from "@/lib/data";
import { Pot } from "@/lib/definitions";

import React, { useEffect, useState } from "react";

export default function PotsPage() {
  const [pots, setPots] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPots = async () => {
      const potsData = await fetchPots();
      setPots(potsData);
    };
    loadPots();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddPot = (newPot: Pot) => {
    setPots([...pots, newPot]);
  };

  const themes: string[] = [];

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold font-public-sans text-3xl mb-3">Pots</h3>
        <Button onClick={handleOpenModal}>+ Add New Pot</Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {pots.map((pot) => {
          themes.push(pot.theme);
          return <PotCard key={pot.name} {...pot} potId={pot.name} />;
        })}
      </div>
      {isModalOpen && (
        <AddPotModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          onAddPot={handleAddPot}
          themes={themes}
        />
      )}
    </div>
  );
}
