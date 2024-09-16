import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Center
} from '@chakra-ui/react';

const LoadingModal = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay bg='blackAlpha.600' />  {/* Darken background */}
      <ModalContent bg='transparent' boxShadow='none'>
        <ModalBody>
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
