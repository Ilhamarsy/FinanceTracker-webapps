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
import { DeleteIcon } from '@chakra-ui/icons';
import { ApiService } from '../services/ApiService';

function Category() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
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

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await ApiService.post('/category', formData);
      toast({
        title: 'Category added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({ name: '' });
      onClose();
      fetchCategories();
    } catch (error) {
      console.error('Error adding/updating category', error);
      toast({
        title: 'Error adding/updating category' + error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async categoryId => {
    setLoading(true);
    try {
      await ApiService.delete(`/category/${categoryId}`);
      toast({
        title: 'Category deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category', error);
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
              Category
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => {
                onOpen();
              }}
            >
              Add New Category
            </Button>
          </HStack>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map(category => (
                <Tr key={category.ID}>
                  <Td>{category.name}</Td>
                  <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(category.ID)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}

      {/* Modal for adding/editing category */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Category name"
                value={formData.title}
                onChange={e => setFormData({ name: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default Category;
