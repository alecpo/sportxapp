import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

import { onGetClients, onDeleteClient } from '#/store/actions/clientsActions';

const FavoriteCitiesScreen = ({ navigation }) => {
  const { clientList, isLoading } = useSelector(({ clients }) => clients);

  const dispatch = useDispatch();

  const onDelete = clientId => {
    dispatch(onDeleteClient(clientId));
  };

  useLayoutEffect(() => {
    dispatch(onGetClients());
  }, [dispatch]);

  const renderRowField = (label, content) => {
    return (
      <StyledRowField>
        <Label
          content={label}
          color={COLORS.secondary}
          marginRight={SPACING.small}
        />
        <Label content={content} color={COLORS.white} />
      </StyledRowField>
    );
  };

  const renderClientCard = ({ id, cpf, cnpj, name, status }) => {
    return (
      <StyledCardView onPress={() => {}}>
        <View>
          {cpf === ''
            ? renderRowField('CNPJ', cnpj)
            : renderRowField('CPF', cpf)}
          {renderRowField('Name', name)}
          {renderRowField('Status', status)}
        </View>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name='deleteuser' size={30} color={COLORS.red} />
        </TouchableOpacity>
      </StyledCardView>
    );
  };

  return (
    <StyledContainer>
      {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.secondary} />
      ) : (
        <>
          {clientList.length > 0 ? (
            <FlatList
              data={clientList}
              renderItem={({ item }) => renderClientCard(item)}
              keyExtractor={item => item.id}
            />
          ) : (
            <StyledEmptyListView>
              <Label
                textAlign='center'
                content='Você ainda não possui dados aqui!'
                typography={TYPOGRAPHY.bigLabelBold}
              />
            </StyledEmptyListView>
          )}
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding: ${SPACING.small}px;
  background-color: ${COLORS.backgroundColor};
`;

const StyledCardView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: ${SPACING.verySmall}px;
  padding-horizontal: ${SPACING.regularPlus}px;
  padding-vertical: ${SPACING.regular}px;
  border-radius: 7px;
  background-color: ${COLORS.primary};
  elevation: 5;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const StyledRowField = styled.View`
  flex-direction: row;
  margin-vertical: ${SPACING.verySmall}px;
`;

const StyledEmptyListView = styled.View`
  padding-vertical: ${SPACING.big}px;
  padding-horizontal: ${SPACING.big}px;
  margin: ${SPACING.regular}px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: ${COLORS.emptyListBackgroundColorCard};
`;

export default FavoriteCitiesScreen;
