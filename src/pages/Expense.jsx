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
  Box,
  Flex,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { ApiService } from '../services/ApiService';
import { Select } from 'chakra-react-select';

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', amount: '' });
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories', error);
      toast({
        title: 'Error fetching categories',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/expenses');
      setExpenses(response.data.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
      toast({
        title: 'Error fetching expenses',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.desc ||
      !formData.amount ||
      selectedOptions.length < 1
    ) {
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
        console.log(selectedOptions.map(data => data.value));
        await ApiService.put(`/expense/${selectedIncome.ID}`, {
          ...formData,
          amount: parseInt(formData.amount),
          category_ids: selectedOptions.map(data => data.value),
        });
        toast({
          title: 'Income updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log({
          ...formData,
          category_ids: selectedOptions.map(data => data.value),
        });
        await ApiService.post('/expense', {
          ...formData,
          amount: parseInt(formData.amount),
          category_ids: selectedOptions.map(data => data.value),
        });
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
      fetchExpenses();
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
    setFormData({
      title: income.title,
      desc: income.desc,
      amount: income.amount,
    });
    setSelectedOptions(
      income.categories.map(category => {
        return { value: category.ID, label: category.name };
      })
    );
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
      fetchExpenses();
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
              Expenses
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => {
                onOpen();
                setFormData({ title: '', desc: '', amount: '' });
                setSelectedOptions([]);
                setSelectedIncome(null);
              }}
            >
              Add New Expense
            </Button>
            </HStack>
            
            <Box overflow="auto">

            

          <Table variant="simple" >
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {expenses.map(income => (
                <Tr key={income.ID}>
                  <Td>{income.title}</Td>
                  <Td>
                    <Flex gap={2}>
                      {income.categories.map(category => (
                        <Box p={1} bg="gray.200" borderRadius={3} px={2}>
                          <Text>{category.name}</Text>
                        </Box>
                      ))}
                    </Flex>
                  </Td>
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
              </Box>
        </>
      )}

      {/* Modal for adding/editing expense */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedIncome ? 'Edit Expense' : 'Add Expense'}
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
              <FormLabel>Categories</FormLabel>
              <Select
                isMulti
                options={categories.map(item => {
                  return { value: item.ID, label: item.name };
                })}
                // onChange={handleCategoryChange}
                value={selectedOptions}
                onChange={e => {
                  setSelectedOptions(e);
                  console.log(e);
                }}
                placeholder="Select categories"
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
}

export default Expense;
