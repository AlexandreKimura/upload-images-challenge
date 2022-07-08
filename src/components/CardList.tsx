import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('');

  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    onOpen();
    setSelectedImage(url);
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing="2rem">
        {cards.map(c => {
          // eslint-disable-next-line react/jsx-no-bind
          return <Card key={c.id} data={c} viewImage={handleViewImage} />;
        })}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        imgUrl={selectedImage}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
