import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import NewClientScreen from '#/screens/NewClientScreen';
import ClientsScreen from '#/screens/ClientsScreen';

import COLORS from '#/utils/colors';

const MainTopTabNavigator = () => {
  const { Navigator, Screen } = createMaterialTopTabNavigator();

  return (
    <>
      <StyledSafeAreaView>
        <Navigator
          tabBarOptions={{
            activeTintColor: COLORS.primary,
            inactiveTintColor: COLORS.defaultGray,
            labelStyle: { fontWeight: 'bold' },
            indicatorStyle: { backgroundColor: COLORS.secondary }
          }}
          initialRouteName='Reservations'
          lazy
        >
          <Screen
            name='Clients'
            component={ClientsScreen}
            options={{ tabBarLabel: 'CLIENTS' }}
          />
          <Screen
            name='AllCities'
            component={NewClientScreen}
            options={{ tabBarLabel: 'NEW CLIENTS' }}
          />
        </Navigator>
      </StyledSafeAreaView>
    </>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.primary};
`;

export default MainTopTabNavigator;
