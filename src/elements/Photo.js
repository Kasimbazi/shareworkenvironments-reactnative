/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { theme } from '../constants';

export default function Photo(props) {
  const { size, height, style, avatar, card } = props;

  const blockStyles = [
    // eslint-disable-next-line no-use-before-define
    size && height && Image,
    avatar && styles.avatar,
    card && styles.card,
    style, // reescrever estilos predefinidos
  ];

  const Image = styled.Image`
    width: ${size}px;
    height: ${height}px;
  `;

  return (
    <Image
      {...props}
      style={blockStyles}
      source={
        typeof props.image === 'string' ? { uri: props.image } : props.image
      }
    />
  );
}

export const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 26,
  },
  card: {
    borderRadius: theme.sizes.radius,
  },
});

Photo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.string,
};
