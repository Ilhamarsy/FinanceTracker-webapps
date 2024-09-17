import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        bg="teal"
        h={{ lg: '100vh' }}
        p="30px"
        position={{ lg: "sticky"}}
        top={{lg:"0"}}
      >
        <Sidebar />
      </GridItem>
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="20px">
        <Outlet />
      </GridItem>
    </Grid>
  );
}
