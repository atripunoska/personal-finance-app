"use client";

import PotCardSkeleton from "@/app/ui/pots/PotCardSkeleton";
import PotCard from "@/app/ui/pots/PotCard";
import { Button } from "@/components/ui/button";
import { fetchPots } from "@/lib/data";
import { Pot } from "@/lib/definitions";

import React, { Suspense, useEffect, useState } from "react";
import AddNewPotModal from "@/app/ui/pots/AddNewPotModal";

export default function PotsPage() {
  const [pots, setPots] = useState<Pot[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPots = async () => {
      try {
        const potsData = await fetchPots(); // Assuming fetchPots is correctly defined elsewhere
        setPots(potsData); // Update the state with fetched data
      } catch (error) {
        console.error("Failed to load pots:", error);
      }
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
    <main>
      <header className="flex justify-between mt-3">
        <h2 className="font-bold text-2xl mb-3">Pots</h2>
        <Button onClick={handleOpenModal} aria-label="Add New Pot">
          + Add New Pot
        </Button>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Suspense fallback={<PotCardSkeleton />}>
          {pots.map((pot) => {
            themes.push(pot.theme);
            return <PotCard key={pot.name} {...pot} potId={pot.name} />;
          })}
        </Suspense>
      </section>

      {isModalOpen && (
        <AddNewPotModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          onAddPot={handleAddPot}
          themes={themes}
        />
      )}
    </main>
  );
}
