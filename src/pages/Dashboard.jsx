import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Card,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  const chartContainerRef = useRef(null); // Reference for the container
  const [width, setWidth] = useState(0);  // State to store width

  useEffect(() => {
    // Function to update the width of the chart container
    const updateWidth = () => {
      if (chartContainerRef.current) {
        setWidth(chartContainerRef.current.offsetWidth);
      }
    };

    // Initial width setting
    updateWidth();

    // Add event listener for window resize
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Flex flexDir="column" w="full" h="full" gap="30px">
      <Box>
        <Text fontWeight="bold" fontSize={30} align="center">Dashboard</Text>
      </Box>
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

      <Card ref={chartContainerRef} gap={4}> {/* Ref for chart container */}
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

        {/* Area Chart with dynamic width */}
        {width > 0 && (
          <>
          <AreaChart
            width={width}  // Dynamic width based on container
            height={400}
            data={data}
            margin={
              {top: 0,
                right: 40,
                left: 20,
                bottom: 0,}
              }
              
              >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </>
        )}
      </Card>
    </Flex>
  );
}
