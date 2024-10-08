import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Spinner,
  Center,
  useDisclosure,
  useToast,
  HStack,
  Text,
  Card,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { ApiService } from '../services/ApiService';

const IncomePage = () => {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', amount: '' });
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchIncomes();
    // eslint-disable-next-line
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/incomes');
      setIncomes(response.data.data);
    } catch (error) {
      console.error('Error fetching incomes', error);
      toast({
        title: 'Error fetching incomes',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.amount || !formData.desc) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (selectedIncome) {
        await ApiService.put(`/income/${selectedIncome.ID}`, {...formData, amount: parseInt(formData.amount)});
        toast({
          title: 'Income updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await ApiService.post('/income', {...formData, amount: parseInt(formData.amount)});
        toast({
          title: 'Income added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      setFormData({ title: '', desc: '', amount: '' });
      setSelectedIncome(null);
      onClose();
      fetchIncomes();
    } catch (error) {
      console.error('Error adding/updating income', error);
      toast({
        title: 'Error adding/updating income' + error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = income => {
    setSelectedIncome(income);
    setFormData({ title: income.title, desc: income.desc, amount: income.amount });
    onOpen();
  };

  const handleDelete = async incomeId => {
    setLoading(true);
    try {
      await ApiService.delete(`/income/${incomeId}`);
      toast({
        title: 'Income deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income', error);
      toast({
        title: 'Error deleting: ' + error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card p={8} height="100%" width="100%" borderRadius={10}>
      {loading ? (
        <Center height="100%">
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : (
        <>
          <HStack align="center" mb={4} justify="space-between">
            <Text fontSize={25} fontWeight="bold">
              Incomes
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => {
                onOpen();
                setFormData({ title: '', desc: '', amount: '' });
                setSelectedIncome(null);
              }}
            >
              Add New Income
            </Button>
          </HStack>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {incomes.map(income => (
                <Tr key={income.id}>
                  <Td>{income.title}</Td>
                  <Td>{income.amount}</Td>
                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => handleEdit(income)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(income.ID)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}

      {/* Modal for adding/editing income */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedIncome ? 'Edit Income' : 'Add Income'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Income title"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Desc"
                value={formData.desc}
                onChange={e =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Income amount"
                type="number"
                value={formData.amount}
                onChange={e =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              {selectedIncome ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default IncomePage;
