import {
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { MdDashboard, MdPerson } from 'react-icons/md';
import { FaWallet, FaMoneyBill } from 'react-icons/fa';

import { IoIosLogOut } from 'react-icons/io';

function Sidebar({ style }) {
  return (
    <Flex justifyContent="center" alignItems="center" h="full" w="full">
      <List color="white" spacing={4} h="full" w="fit-content">
        <Flex
          flexDirection="column"
          h="full"
          w="fit-content"
          justifyContent="space-between"
        >
          <Box w="fit-content">
            <Text align="center" fontSize="x-large" fontWeight="bold" mb="30px">
              Tracker
            </Text>
            <ListItem w="fit-content">
              <NavLink to="/dashboard">
                <ListIcon as={MdDashboard} color="white" />
                <span>Dashboard</span>
              </NavLink>
            </ListItem>
            <Spacer h="10px" />
            <ListItem w="fit-content">
              <NavLink to="/income">
                <ListIcon as={FaWallet} color="white" />
                <span>Income</span>
              </NavLink>
            </ListItem>
            <Spacer h="10px" />
            <ListItem w="fit-content">
              <NavLink to="/expense">
                <ListIcon as={FaMoneyBill} color="white" />
                <span>Expense</span>
              </NavLink>
            </ListItem>
          </Box>
          <Box w="fit-content">
            <ListItem w="fit-content" mt="10px">
              <NavLink to="/profile">
                <ListIcon as={MdPerson} color="white" />
                <span>Profile</span>
              </NavLink>
            </ListItem>

            <Spacer h="10px" />
            <ListItem w="fit-content" color="red">
              <NavLink to="#">
                <ListIcon as={IoIosLogOut} color="red" />
                <span>Logout</span>
              </NavLink>
            </ListItem>
          </Box>
        </Flex>
      </List>
    </Flex>
  );
}

export default Sidebar;
