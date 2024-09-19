import React, { useRef, useState, useEffect } from 'react';
import { Box, Card, Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ApiService } from '../services/ApiService';

export default function Dashboard() {
  const chartContainerRef = useRef(null); 
  const [width, setWidth] = useState(window.innerWidth / 1.22); // Initialize with a default value

  const [stats, setStats] = useState({
    total_balance: 0,
    total_income: 0,
    total_expense: 0,
    monthly_balance: 0,
    monthly_income: 0,
    monthly_expense: 0,
  });

  const [data, setData] = useState([
    {
      id: 1,
      month: 'January',
      income: 0,
      expense: 0,
    },
    {
      id: 2,
      month: 'February',
      income: 0,
      expense: 0,
    },
    {
      id: 3,
      month: 'March',
      income: 0,
      expense: 0,
    },
    {
      id: 4,
      month: 'April',
      income: 0,
      expense: 0,
    },
    {
      id: 5,
      month: 'May',
      income: 0,
      expense: 0,
    },
    {
      id: 6,
      month: 'June',
      income: 0,
      expense: 0,
    },
    {
      id: 7,
      month: 'July',
      income: 0,
      expense: 0,
    },
    {
      id: 8,
      month: 'August',
      income: 0,
      expense: 0,
    },
    {
      id: 9,
      month: 'September',
      income: 0,
      expense: 0,
    },
    {
      id: 10,
      month: 'October',
      income: 0,
      expense: 0,
    },
    {
      id: 11,
      month: 'November',
      income: 0,
      expense: 0,
    },
    {
      id: 12,
      month: 'December',
      income: 0,
      expense: 0,
    },
  ])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        setWidth(chartContainerRef.current.offsetWidth);
      }
    };

    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);


  const toast = useToast();

  useEffect(() => { 
    fetchIncomes()
    fetchYearlyStat()
    // eslint-disable-next-line
  }, [])

  const fetchYearlyStat = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/stats-yearly?year=${new Date().getFullYear()}`);
      const { expenses, incomes } = response.data.data;
  
      setData((prevData) => {
        return prevData.map((item) => {
          const expenseForMonth = expenses?.find((exp) => exp.Month === item.id);
          const incomeForMonth = incomes?.find((inc) => inc.Month === item.id);
  
          return {
            ...item,
            income: incomeForMonth ? incomeForMonth.Total : item.income,
            expense: expenseForMonth ? expenseForMonth.Total : item.expense,
          };
        });
      });
  
    } catch (error) {
      console.error("Error fetching incomes", error);
      toast({
        title: "Error fetching:" + error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/stats");
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching incomes", error);
      toast({
        title: "Error fetching:" + error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Center height="100%">
      <Spinner size="xl" color="teal.500" />
    </Center>
  ) : (
    <>
      <Flex flexDir="column" w="full" h="full" gap="30px">
        <Box>
          <Text fontWeight="bold" fontSize={30} align="center">
            Dashboard
          </Text>
        </Box>
        <Card bg="#EEEDEB">
          <Text align="center" fontWeight="bold" pt="30px" fontSize="x-large">
            Total
          </Text>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            justifyContent="space-between"
            p="10px"
            gap={4}
          >
            <Card w="full" p="10px" align="center">
              <Text fontSize="15" color="gray">
                Balance
              </Text>
              <Text fontWeight="bold" fontSize="35" color="teal">
                {stats.total_balance}
              </Text>
            </Card>
            <Card w="full" p="10px" align="center">
              <Text fontSize="15" color="gray">
                Income
              </Text>
              <Text fontWeight="bold" fontSize="35" color="green">
                {stats.total_income}
              </Text>
            </Card>
            <Card w="full" p="10px" align="center">
              <Text fontSize="15" color="gray">
                Expense
              </Text>
              <Text fontWeight="bold" fontSize="35" color="red">
                {stats.total_expense}
              </Text>
            </Card>
          </Flex>
        </Card>

        <Card ref={chartContainerRef} gap={4} bg="#EEEDEB">
          <Text align="center" fontWeight="bold" pt="30px" fontSize="x-large">
            Monthly
          </Text>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            justifyContent="space-between"
            p="20px"
            gap={4}
          >
            <Card w="full" p="10px" align="center">
              <Text fontSize="15" color="gray">
                Balance
              </Text>
              <Text fontWeight="bold" fontSize="35" color="teal">
                {stats.monthly_balance}
              </Text>
            </Card>
            <Card w="full" p="10px" align="center">
              <Text fontSize="15" color="gray">
                Income
              </Text>
              <Text fontWeight="bold" fontSize="35" color="green">
                {stats.monthly_income}
              </Text>
            </Card>
            <Card w="full" p="10px" align="center">
              <Text fontSize="15" color="gray">
              Expense
              </Text>
              <Text fontWeight="bold" fontSize="35" color="red">
                {stats.monthly_expense}
              </Text>
            </Card>
          </Flex>

          {/* Area Chart with dynamic width */}
          {width > 0 && (
            <Box bg="white" mb={10} mx="20px" px={10} py={10} borderRadius={10}>
              <AreaChart
                width={width - 120} // Dynamic width based on container
                height={400}
                data={data}
                margin={{ top: 10, right: 40, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stackId="2"
                  stroke="#C7253E"
                  fill="#C7253E"
                />
              </AreaChart>
            </Box>
          )}
        </Card>
      </Flex>
    </>
  );
}
