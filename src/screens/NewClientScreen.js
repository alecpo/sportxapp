import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Label from '#/components/Label';
import TextInputLine from '#/components/TextInputLine';
import CheckCircle from '#/components/CheckCircle';
import SubmitButton from '#/components/SubmitButton';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

const STRINGS = {
  messages: {
    requiredField: '* Mandatory field',
    validEmail: '* Invalid email'
  }
};

const isValidCPF = number => {
  let sum;
  let rest;
  sum = 0;
  if (number === '00000000000') return false;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(number.substring(i - 1, i), 10) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(number.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(number.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;

  if (rest !== parseInt(number.substring(10, 11), 10)) return false;
  return true;
};

import { onAddClient } from '#/store/actions/clientsActions';

const NewClientScreen = ({ navigation }) => {
  const [isCompany, setIsCompany] = useState(false);
  const [localStatus, setLocalStatus] = useState('Active');

  const dispatch = useDispatch();

  const checkCEP = (zipCode, setError = () => {}, removeError = () => {}) => {
    axios
      .get(`https://viacep.com.br/ws/${zipCode}/json`)
      .then(resAddressUser => {
        if (resAddressUser.data.erro) setError();
        else {
          const {
            data: { logradouro, bairro, localidade, uf }
          } = resAddressUser;
          formik.setValues({
            ...formik.values,
            zip: zipCode,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf
          });
          removeError();
        }
      })
      .catch(e => {
        setError();
        console.log('Um erro ocorreu ao consumir a API do VIACEP!: ', e);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(STRINGS.messages.requiredField),
    email: Yup.string()
      .email(STRINGS.messages.validEmail)
      .required(STRINGS.messages.requiredField),
    cpf: Yup.string().test('test-number', 'CPF inválido', value =>
      isValidCPF(value)
    )
  });

  const onSubmit = values => {
    const phoneList = values.phoneList;
    delete values.phoneList;
    const clientComplete = { client: values, phoneList };
    dispatch(onAddClient(clientComplete));
    console.log(clientComplete);
    formik.setValues(formik.initialValues);
    navigation.jumpTo('Clients');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      cep: '',
      cnpj: '',
      cpf: '',
      companyName: '',
      email: '',
      status: 'Active',
      phoneList: []
    },
    onSubmit: async values => {
      onSubmit(values);
    },
    validationSchema
  });

  return (
    <StyledContainer>
      <TextInputLine
        marginBottom={SPACING.regular}
        hasLabel
        hasError={
          formik.errors.name && formik.touched.name && formik.values.name
        }
        textColor={COLORS.secondary}
        label='Name (*)'
        labelTypography={TYPOGRAPHY.mediumLabel}
        setInputFieldValue={value => {
          formik.setFieldValue('name', value);
        }}
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        defaultTextInputProps={{
          onBlur: () => {
            if (formik.values.name) formik.setFieldTouched('name', true, false);
            else {
              formik.setFieldTouched('name', false);
            }
          },
          selectionColor: COLORS.secondary
        }}
      />
      {formik.errors.name && formik.touched.name && formik.values.name ? (
        <Label
          content={formik.errors.name}
          typography={TYPOGRAPHY.smallLabel}
          marginBottom={SPACING.small}
          color={COLORS.red}
        />
      ) : null}
      <TextInputLine
        marginBottom={SPACING.regular}
        mask={{
          type: 'zip-code'
        }}
        hasLabel
        hasError={formik.errors.cep && formik.touched.cep && formik.values.cep}
        textColor={COLORS.secondary}
        label='CEP'
        labelTypography={TYPOGRAPHY.mediumLabel}
        setInputFieldValue={value => {
          formik.setFieldValue('cep', value);
          checkCEP(
            value,
            () => formik.setFieldError('cep', STRINGS.messages.requiredField),
            () => formik.setFieldError('cep', undefined)
          );
        }}
        value={formik.values.cep}
        onChangeText={formik.handleChange('cep')}
        defaultTextInputProps={{
          onBlur: () => {
            if (formik.values.cep) formik.setFieldTouched('cep', true, false);
            else {
              formik.setFieldTouched('cep', false);
            }
          },
          selectionColor: COLORS.secondary
        }}
      />
      {formik.errors.cep && formik.touched.cep && formik.values.cep ? (
        <Label
          content={formik.errors.cep}
          typography={TYPOGRAPHY.smallLabel}
          marginBottom={SPACING.small}
          color={COLORS.red}
        />
      ) : null}
      <StyledSelectorsRow>
        <CheckCircle
          label='Person'
          isChecked={!isCompany}
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.secondary}
          onPress={() => setIsCompany(false)}
          marginVertical={SPACING.small}
        />
        <CheckCircle
          label='Company'
          isChecked={isCompany}
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.secondary}
          onPress={() => setIsCompany(true)}
          marginVertical={SPACING.small}
        />
      </StyledSelectorsRow>

      {isCompany ? (
        <>
          <TextInputLine
            marginBottom={SPACING.regular}
            hasLabel
            hasError={
              formik.errors.cnpj && formik.touched.cnpj && formik.values.cnpj
            }
            textColor={COLORS.secondary}
            label='CNPJ'
            labelTypography={TYPOGRAPHY.mediumLabel}
            setInputFieldValue={value => {
              formik.setFieldValue('cnpj', value);
            }}
            value={formik.values.cnpj}
            onChangeText={formik.handleChange('cnpj')}
            defaultTextInputProps={{
              onBlur: () => {
                if (formik.values.cnpj)
                  formik.setFieldTouched('cnpj', true, false);
                else {
                  formik.setFieldTouched('cnpj', false);
                }
              },
              selectionColor: COLORS.secondary
            }}
          />
          {formik.errors.cnpj && formik.touched.cnpj && formik.values.cnpj ? (
            <Label
              content={formik.errors.cnpj}
              typography={TYPOGRAPHY.smallLabel}
              marginBottom={SPACING.small}
              color={COLORS.red}
            />
          ) : null}
          <TextInputLine
            marginBottom={SPACING.regular}
            hasLabel
            hasError={
              formik.errors.companyName &&
              formik.touched.companyName &&
              formik.values.companyName
            }
            textColor={COLORS.secondary}
            label='Company Name'
            labelTypography={TYPOGRAPHY.mediumLabel}
            setInputFieldValue={value => {
              formik.setFieldValue('companyName', value);
            }}
            value={formik.values.cpf}
            onChangeText={formik.handleChange('companyName')}
            defaultTextInputProps={{
              onBlur: () => {
                if (formik.values.companyName)
                  formik.setFieldTouched('companyName', true, false);
                else {
                  formik.setFieldTouched('companyName', false);
                }
              },
              selectionColor: COLORS.secondary
            }}
          />
          {formik.errors.companyName &&
          formik.touched.companyName &&
          formik.values.companyName ? (
            <Label
              content={formik.errors.companyName}
              typography={TYPOGRAPHY.smallLabel}
              marginBottom={SPACING.small}
              color={COLORS.red}
            />
          ) : null}
        </>
      ) : (
        <>
          <TextInputLine
            marginBottom={SPACING.regular}
            hasLabel
            mask={{ type: 'cpf' }}
            hasError={
              formik.errors.cpf && formik.touched.cpf && formik.values.cpf
            }
            textColor={COLORS.secondary}
            label='CPF (*)'
            labelTypography={TYPOGRAPHY.mediumLabel}
            setInputFieldValue={value => {
              formik.setFieldValue('cpf', value);
            }}
            value={formik.values.cpf}
            onChangeText={formik.handleChange('cpf')}
            defaultTextInputProps={{
              onBlur: () => {
                if (formik.values.cpf)
                  formik.setFieldTouched('cpf', true, false);
                else {
                  formik.setFieldTouched('cpf', false);
                }
              },
              selectionColor: COLORS.secondary
            }}
          />
          {formik.errors.cpf && formik.touched.cpf && formik.values.cpf ? (
            <Label
              content={formik.errors.cpf}
              typography={TYPOGRAPHY.smallLabel}
              marginBottom={SPACING.small}
              color={COLORS.red}
            />
          ) : null}
        </>
      )}

      <TextInputLine
        marginBottom={SPACING.regular}
        hasLabel
        hasError={
          formik.errors.email && formik.touched.email && formik.values.email
        }
        textColor={COLORS.secondary}
        label='Email (*)'
        labelTypography={TYPOGRAPHY.mediumLabel}
        setInputFieldValue={value => {
          formik.setFieldValue('email', value);
        }}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        defaultTextInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          onBlur: () => {
            if (formik.values.email)
              formik.setFieldTouched('email', true, false);
            else {
              formik.setFieldTouched('email', false);
            }
          },
          selectionColor: COLORS.secondary
        }}
      />
      {formik.errors.email && formik.touched.email && formik.values.email ? (
        <Label
          content={formik.errors.email}
          typography={TYPOGRAPHY.smallLabel}
          marginBottom={SPACING.small}
          color={COLORS.red}
        />
      ) : null}
      <CheckCircle
        label='Active'
        isChecked={localStatus === 'Active'}
        unCheckedColor={COLORS.darkBlueFont}
        checkedColor={COLORS.secondary}
        onPress={() => {
          formik.setFieldValue('status', 'Active');
          setLocalStatus('Active');
        }}
        marginVertical={SPACING.small}
      />
      <CheckCircle
        label='Inactive'
        isChecked={localStatus === 'Inactive'}
        unCheckedColor={COLORS.darkBlueFont}
        checkedColor={COLORS.secondary}
        onPress={() => {
          formik.setFieldValue('status', 'Inactive');
          setLocalStatus('Inactive');
        }}
        marginVertical={SPACING.small}
      />
      <CheckCircle
        label='Preferential'
        isChecked={localStatus === 'Preferential'}
        unCheckedColor={COLORS.darkBlueFont}
        checkedColor={COLORS.secondary}
        onPress={() => {
          formik.setFieldValue('status', 'Preferential');
          setLocalStatus('Preferential');
        }}
        marginVertical={SPACING.small}
      />
      <StyledBottomView>
        <SubmitButton
          submit={formik.handleSubmit}
          disabled={!formik.isValid || !formik.dirty}
          title='Register Customer'
          labelColor={
            !formik.isValid || !formik.dirty ? COLORS.primary : COLORS.white
          }
          backgroundColor={COLORS.primary}
          marginVertical={SPACING.regular}
        />
      </StyledBottomView>
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  flex: 1;
  padding: ${SPACING.regularPlus}px;
  background-color: ${COLORS.backgroundColor};
`;

const StyledSelectorsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-vertical: ${SPACING.verySmall}px;
`;

const StyledBottomView = styled.View`
  margin-bottom: ${SPACING.huge}px;
`;

const StyledCardView = styled.TouchableOpacity`
  margin-vertical: ${SPACING.small}px;
  padding-horizontal: ${SPACING.smallPlus}px;
  padding-vertical: ${SPACING.regular}px;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

export default NewClientScreen;
