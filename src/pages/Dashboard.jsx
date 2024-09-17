import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Flex flexDir="column" w="full" h="full" gap="30px">
      <Card>
        <Text align="center" fontWeight="bold" pt="10px">Total</Text>
        <Flex
          flexDir={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
          p="10px"
          gap={4}
        >
          <Card w="full" p="10px" align="center">
            <Text fontSize="15" color="gray">Balance</Text>
            <Text fontWeight="bold" fontSize="35" color="teal">
              10000
            </Text>
          </Card>
          <Card w="full" p="10px" align="center">
          <Text fontSize="15" color="gray">Income</Text>
            <Text fontWeight="bold" fontSize="35" color="green">
              10000
            </Text>
          </Card>
          <Card w="full" p="10px" align="center">
          <Text fontSize="15" color="gray">Outcome</Text>
            <Text fontWeight="bold" fontSize="35" color="red">
              10000
            </Text>
          </Card>
        </Flex>
      </Card>

      <Card>
        <Text align="center" fontWeight="bold" pt="10px">Monthly</Text>
        <Flex
          flexDir={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
          p="10px"
          gap={4}
        >
          <Card w="full" p="10px" align="center">
            <Text fontSize="15" color="gray">Balance</Text>
            <Text fontWeight="bold" fontSize="35" color="teal">
              10000
            </Text>
          </Card>
          <Card w="full" p="10px" align="center">
          <Text fontSize="15" color="gray">Income</Text>
            <Text fontWeight="bold" fontSize="35" color="green">
              10000
            </Text>
          </Card>
          <Card w="full" p="10px" align="center">
          <Text fontSize="15" color="gray">Outcome</Text>
            <Text fontWeight="bold" fontSize="35" color="red">
              10000
            </Text>
          </Card>
        </Flex>
      </Card>
    </Flex>
    // <Grid templateColumns='repeat(6, 1fr)' templateRows='repeat(2, 1fr)' gap={4}>
    //   <GridItem h='200px' colSpan={2} rowSpan={1} bg='tomato'/>
    //   <GridItem h='200px' colSpan={2} rowSpan={1} bg='tomato'/>
    //   <GridItem h='200px' colSpan={2} rowSpan={1} bg='tomato'/>
    //   <GridItem h='200px' colSpan={2} rowSpan={1} bg='tomato'/>
    //   <GridItem h='200px' colSpan={6} rowSpan={1} bg='papayawhip'/>
    //   <GridItem h='200px' colSpan={3} rowSpan={1} bg='tomato'/>
    //   <GridItem h='200px' colSpan={3} rowSpan={1} bg='tomato'/>
    // </Grid>
  );
}
