/* eslint-disable camelcase */
import axios from 'axios';

import {
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILURE,
  ADD_CLIENT,
  ADD_CLIENTS_SUCCESS,
  ADD_CLIENTS_FAILURE,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE,
  UPDATE_CLIENTS_SUCCESS,
  UPDATE_CLIENTS_FAILURE
} from './actionTypes';

import { API } from '#/config/api';

export const getClients = () => ({ type: GET_CLIENTS });

export const getClientsSuccess = clientList => ({
  type: GET_CLIENTS_SUCCESS,
  payload: clientList
});

export const getClientsFailure = () => ({ type: GET_CLIENTS_FAILURE });

export const addClient = () => ({
  type: ADD_CLIENT
});

export const addClientsSuccess = client => ({
  type: ADD_CLIENTS_SUCCESS,
  payload: client
});

export const addClientsFailure = () => ({
  type: ADD_CLIENTS_FAILURE
});

export const deleteClientSuccess = clientId => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: clientId
});

export const deleteClientFailure = () => ({
  type: DELETE_CLIENT_FAILURE
});

export const updateClientsSuccess = client => ({
  type: UPDATE_CLIENTS_SUCCESS,
  payload: client
});

export const updateClientsFailure = () => ({
  type: UPDATE_CLIENTS_FAILURE
});

export const onGetClients = () => dispatch => {
  dispatch(getClients);
  axios({
    method: 'get',
    url: API.client
  })
    .then(res => {
      dispatch(getClientsSuccess(res.data));
    })
    .catch(e => {
      console.log('Error on try to get clients: ', e);
      dispatch(getClientsFailure());
    });
};

export const onAddClient = client => dispatch => {
  dispatch(addClient());
  axios({
    method: 'post',
    url: API.client,
    data: client
  })
    .then(res => {
      dispatch(addClientsSuccess(res.data));
    })
    .catch(e => {
      console.log('Error on try to add new client: ', e);
      dispatch(addClientsFailure());
    });
};

export const onDeleteClient = clientId => dispatch => {
  axios({
    method: 'delete',
    url: `${API.client}/${clientId}`
  })
    .then(res => {
      dispatch(deleteClientSuccess(clientId));
    })
    .catch(e => {
      console.log('Error on try to get clients: ', e);
      dispatch(deleteClientFailure());
    });
};

export const onUpdateClients = client => dispatch => {
  dispatch(updateClientsSuccess(client));
};
