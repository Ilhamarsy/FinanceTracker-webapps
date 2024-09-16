import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { BiShow, BiHide } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { ApiService } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../components/LoadingModal';
import { useAuth } from '../hooks/UseAuth';

const CMdEmail = chakra(MdEmail);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


function Register() {
  const toast = useToast();
  const { token} = useAuth()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    ApiService.post('/register', {
      name: name,
      email: email,
      password: password,
    }).then(() => {
      setIsLoading(false);
      navigate('/login');
    }).catch(err => { 
      setIsLoading(false);
      toast({
        title: 'Error fetching data.',
        description: err.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400" mb="20px">
            Register
          </Heading>
          <Box minW={{ base: '90%', md: '468px' }}>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="name"
                      placeholder="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CMdEmail color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <InputRightElement width="3rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? <BiHide /> : <BiShow />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius="md"
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  mt="2rem"
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Have account?{' '}
          <Link color="teal.500" href="/login">
            Login
          </Link>
        </Box>
      </Flex>
    </>
  );
}

export default Register;
