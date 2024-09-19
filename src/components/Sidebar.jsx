import {
  Box,
  Flex,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { MdDashboard } from 'react-icons/md';
import { FaWallet, FaMoneyBill } from 'react-icons/fa';

import { IoIosLogOut, IoIosOptions  } from 'react-icons/io';
import { useAuth } from '../hooks/UseAuth';

const menus = [
  {
    title: 'Dashboard',
    icon: <MdDashboard />,
    path: '/dashboard',
  },
  {
    title: 'Category',
    icon: <IoIosOptions />,
    path: '/categories',
  },
  {
    title: 'Income',
    icon: <FaMoneyBill />,
    path: '/incomes',
  },
  {
    title: 'Expense',
    icon: <FaWallet />,
    path: '/expenses',
  },
];

function Sidebar() {
  
  const { logout } = useAuth();
  const location = useLocation();
  return (
    <Flex justifyContent="center" alignItems="center" h="full" w="full" fontSize={{ lg: 20 }}>
      <List color="white" spacing={4} h="full" w="fit-content">
        <Flex flexDirection="column" h="full" w="fit-content" justifyContent="space-between">
          <Box w="fit-content " h="full">
            <Text align="center" fontSize={{ base: 25, lg: 30 }} fontWeight="bold" mb="30px">
              Tracker
            </Text>
            {menus.map((item) => (
              <ListItem w="full" key={item.path}>
                <NavLink
                  to={item.path}
                >
                  <Flex
                    dir="row"
                    p={2}
                    px={10}
                    gap={3}
                    mb={2}
                    borderRadius={10}
                    alignItems="center"
                    w="full"
                    bg={location.pathname === item.path ? 'whiteAlpha.800' : 'transparent'}
                    _hover={{ bg: location.pathname === item.path ? 'whiteAlpha.800' : 'whiteAlpha.400' }}
                    color={location.pathname === item.path ? 'black' : 'white'}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Flex>
                </NavLink>
              </ListItem>
            ))}
          </Box>
          <ListItem w="full">
            <NavLink onClick={() => logout()}
            >
              <Flex
                dir="row"
                p={2}
                px={10}
                gap={3}
                borderRadius={10}
                alignItems="center"
                w="full"
                bg="red.700"
                _hover={{ bg: 'red.600' }}
              >
                <IoIosLogOut />
                <span>Logout</span>
              </Flex>
            </NavLink>
          </ListItem>
        </Flex>
      </List>
    </Flex>
  );
}

export default Sidebar;
