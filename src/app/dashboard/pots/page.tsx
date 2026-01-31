'use client';

import PotCardSkeleton from '@/app/ui/pots/PotCardSkeleton';
import PotCard from '@/app/ui/pots/PotCard';
import { Button } from '@/components/ui/button';
import { Pot } from '@/lib/definitions';

import React, { useEffect, useState } from 'react';
import AddNewPotModal from '@/app/ui/pots/AddNewPotModal';

export default function PotsPage() {
  const [pots, setPots] = useState<Pot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const loadPots = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/pots');
      if (!response.ok) throw new Error('Failed to fetch pots');
      const potsData = await response.json();
      setPots(potsData);
    } catch (error) {
      console.error('Failed to load pots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPots();
  }, []);
  const handlePotDeleted = () => {
    loadPots();
  };

  const handlePotUpdated = () => {
    loadPots();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddPot = (newPot: Pot) => {
    setPots([...pots, newPot]);
  };

  const themes: string[] = pots.map((pot) => pot.theme);

  return (
    <main>
      <header className="flex justify-between mt-3">
        <h2 className="font-bold text-2xl mb-3">Pots</h2>
        <Button onClick={handleOpenModal} aria-label="Add New Pot">
          + Add New Pot
        </Button>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {isLoading ? (
          <>
            <PotCardSkeleton />
            <PotCardSkeleton />
          </>
        ) : (
          pots.map((pot) => (
            <PotCard
              key={pot.name}
              {...pot}
              potId={pot.name}
              onPotDeleted={handlePotDeleted}
              onPotUpdated={handlePotUpdated}
            />
          ))
        )}
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
