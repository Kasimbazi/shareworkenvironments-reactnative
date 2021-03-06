/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text, Button } from '../../elements';

import { theme } from '../../constants';
import { data } from '../../utils';
import styles from './styles';
import { Gallery } from '../../components';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

const WorkDetailScreen = (props) => {
  const { photo, onClose, sourcePhotoDimensions } = props;
  const [showGallery, setShowGallery] = useState(false);

  const [openProgress, setOpenProgress] = useState(new Animated.Value(0));
  const [openMeasurements, setOpenMeasurements] = useState(null);

  const [sourcePhoto, setSourcePhoto] = useState({
    x: sourcePhotoDimensions.x,
    y: sourcePhotoDimensions.y,
    width: sourcePhotoDimensions.width,
    height: sourcePhotoDimensions.height,
  });

  const { startColor, endColor, locations } = props;

  const elementRef = useRef();

  const [destinePhoto, setDestinePhoto] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [work, setWork] = useState({
    id: '',
    like: false,
    title: '',
    address: '',
    about: '',
    background: '',
    image1: '',
    image2: '',
    image3: '',
  });

  useEffect(() => {
    function findWork() {
      data.content.map((item) => {
        if (item.id === photo.id) {
          setWork({
            id: item.id,
            like: item.like,
            title: item.title,
            address: item.address,
            about: item.about,
            background: item.background,
            image1: item.image1,
            image2: item.image2,
            image3: item.image3,
          });
        }
      });
    }

    findWork();
  }, []);

  useEffect(() => {
    Animated.timing(openProgress, {
      toValue: 1,
      duration: 300,
    }).start();

    setOpenMeasurements({
      sourceX: sourcePhoto.x,
      sourceY: sourcePhoto.y,
      sourceWidth: sourcePhoto.width,
      sourceHeight: sourcePhoto.height,
      destX: 0,
      destY: 0,
      destWidth: maxWidth,
      destHeight: 320,
    });
  }, []);

  function onClickGallery() {
    setShowGallery(true);
  }

  function onHideGallery() {
    setShowGallery(false);
  }

  function renderGallery() {
    return (
      <Gallery
        idGallery={work.id}
        visible={showGallery}
        onRequestClose={onHideGallery}
      />
    );
  }

  return (
    <Block style={[StyleSheet.absoluteFill]} flex={false}>
      {onClickGallery && renderGallery()}
      <Block
        size={50}
        margin={[theme.sizes.padding * 2, theme.sizes.base]}
        flex={false}
        absolute
        index={2}
      >
        <Button style onPress={onClose}>
          <AntDesign name="close" size={28} color={theme.colors.primary} />
        </Button>
      </Block>
      <Animated.Image
        ref={elementRef}
        onLayout={(event) => {
          if (elementRef) {
            // const { x, y, width, height } = event.nativeEvent.layout;
            // setDestinePhoto({ x: 0, y: 0, width: maxWidth, height: 320 });
          }
        }}
        source={{ uri: work.background }}
        style={{
          width: maxWidth,
          height: 320,
          opacity: openProgress.interpolate({
            inputRange: [0.8, 1],
            outputRange: [0, 1],
          }),
        }}
      />

      {openMeasurements && (
        <Animated.Image
          source={{ uri: work.background }}
          style={{
            position: 'absolute',
            width: openProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [
                openMeasurements.sourceWidth,
                openMeasurements.destWidth,
              ],
            }),
            height: openProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [
                openMeasurements.sourceHeight,
                openMeasurements.destHeight,
              ],
            }),
            left: openProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [openMeasurements.sourceX, openMeasurements.destX],
            }),
            top: openProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [openMeasurements.sourceY, openMeasurements.destY],
            }),
          }}
        />
      )}
      <Animated.View
        style={{
          top: maxHeight / 3.5,
          position: 'absolute',
          zIndex: 4,
          flex: 1,
          opacity: openProgress,
          transform: [
            {
              translateY: openProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        }}
      >
        <LinearGradient
          locations={locations}
          colors={[startColor, endColor]}
          style={{
            paddingTop: theme.sizes.base * 2,
          }}
        >
          <Block
            flex={false}
            margin={[0, theme.sizes.base * 2, 0, theme.sizes.base * 2]}
          >
            <Text h2 bold>
              {work.title}
            </Text>
          </Block>
          <Block flex={false} padding={[0, theme.sizes.base * 2]}>
            <Text bold>{work.address}</Text>
            <Block
              padding={[theme.sizes.base, 0]}
              border
              center
              row
              flex={false}
            >
              <Block row left>
                <AntDesign
                  name="heart"
                  size={28}
                  color={theme.colors.secondary}
                />
              </Block>
              <Block row right>
                <Ionicons
                  name="ios-share"
                  size={28}
                  color={theme.colors.secondary}
                />
              </Block>
            </Block>
            <Block flex={false} margin={[theme.sizes.base * 2, 0]}>
              <Text h3 bold>
                About
              </Text>
              <Block flex={false} margin={[theme.sizes.base, 0]}>
                <Text>{work.about}</Text>
              </Block>
            </Block>

            <Block flex={false}>
              <Text bold h3>
                Galeria
              </Text>

              <Block
                padding={[theme.sizes.base * 2, theme.sizes.base]}
                row
                flex={false}
              >
                <Block padding={[0, 15, 0, 0]} flex={false}>
                  <Image
                    source={{ uri: work.image1 }}
                    style={{
                      borderRadius: theme.sizes.radius,
                      width: 80,
                      height: 80,
                    }}
                  />
                </Block>
                <Block padding={[0, 15, 0, 0]} flex={false}>
                  <Image
                    source={{ uri: work.image2 }}
                    style={{
                      borderRadius: theme.sizes.radius,
                      width: 80,
                      height: 80,
                    }}
                  />
                </Block>
                <Block flex={false}>
                  <Button onPress={onClickGallery} style={styles.plus}>
                    <Text h3>+3</Text>
                  </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        </LinearGradient>
      </Animated.View>
    </Block>
  );
};

WorkDetailScreen.defaultProps = {
  startColor: 'rgba(52, 52, 52, 0.0)',
  endColor: theme.colors.primary,
  locations: [0, 0.12],
};

export default function WorkScreen(props) {
  const [photo, setPhoto] = useState(null);
  const [dimensions, setDimensions] = useState({});

  function open(photo) {
    setPhoto(photo);
  }
  function close() {
    setPhoto(null);
  }

  function sourcePhoto(dimensions) {
    setDimensions(dimensions);
  }

  return (
    // eslint-disable-next-line no-use-before-define
    <ScrollView showsVerticalScrollIndicator={false}>
      {props.onClosed({ onClosed: photo === null })}
      {props.renderContent({
        onPhotoOpen: open,
        dimensionPhotoClicked: sourcePhoto,
      })}
      {photo && (
        <WorkDetailScreen
          photo={photo}
          onClose={close}
          sourcePhotoDimensions={dimensions}
        />
      )}
    </ScrollView>
  );
}
