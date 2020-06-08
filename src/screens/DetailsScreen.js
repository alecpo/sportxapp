import React, { useState, useLayoutEffect, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '#/components/Label';
import SubmitButton from '#/components/SubmitButton';

import { API, appid } from '#/config/api';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

import {
  onAddFavorite,
  onRemoveFavorite,
  onUpdateFavorite
} from '#/store/actions/clientsActions';

const DetailsScreen = ({ route, navigation }) => {
  const { client } = route.params;

  const renderRowIcon = (iconName, iconColor, temp, desc) => {
    return (
      <StyledRow>
        <Icon name={iconName} size={30} color={iconColor} />
        <Label
          content={`${temp} °C`}
          marginLeft={SPACING.smallPlus}
          typography={TYPOGRAPHY.bigLabelBold}
        />
        <Label
          content={desc}
          marginLeft={SPACING.smallPlus}
          typography={TYPOGRAPHY.bigLabelBold}
        />
      </StyledRow>
    );
  };

  return (
    <StyledContainer activeOpacity={1} onPress={() => navigation.pop()}>
      <StyledContentView />
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledContentView = styled.View`
  width: ${Dimensions.get('window').width * 0.9}px;
  justify-content: space-between;
  background-color: ${COLORS.secondary};
  border-radius: 5px;
  padding: ${SPACING.regularPlus}px;
`;

const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${SPACING.small}px;
`;

const StyledWeatherImage = styled.Image`
  align-self: center;
  resize-mode: contain;
  height: 100px;
  width: 100px;
`;

export default DetailsScreen;
