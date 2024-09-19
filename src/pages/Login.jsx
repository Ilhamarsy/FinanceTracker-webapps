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
import { useAuth } from '../hooks/UseAuth';
import { FaLock } from 'react-icons/fa';
import { BiShow, BiHide } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import LoadingModal from '../components/LoadingModal';
import { useNavigate } from 'react-router-dom';

const CMdEmail = chakra(MdEmail);
const CFaLock = chakra(FaLock);

export default function Login() {
  const { token, login } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await login(email, password);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error('Error during login:', err);
      toast({
        title: 'Error logging in.',
        description: err.response?.data?.message || err.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
          <Heading color="teal.400">Login</Heading>
          <Box minW={{ base: '90%', md: '468px' }}>
            <form onSubmit={handleLogin}>
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
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?{' '}
          <Link color="teal.500" href="/register">
            Register
          </Link>
        </Box>
      </Flex>
    </>
  );
}
