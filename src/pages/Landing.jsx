import { Box, Button, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <VStack h="100vh" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Heading fontSize="4rem">Welcome to Finance Tracker</Heading>
        <Text>Manage your income and expenses efficiently.</Text>
        <Spacer height="40px" />
        <Button color="white" colorScheme="teal" as={Link} to="/login">
          Get Started
        </Button>
      </Box>
    </VStack>
  );
}

export default Landing;
