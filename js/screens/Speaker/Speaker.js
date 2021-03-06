import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '../../components/CustomText';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { colors } from '../../config/styles';
import styles from './styles';

const Speaker = ({ data, navigation }) => {
  return (
    <View style={styles.modalWrapper}>
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} title='X'>
          <Icon
            name='close'
            size={Platform.OS === 'ios' ? 40 : 30}
            color={colors.bgLight}
            style={styles.close}
          />
        </TouchableOpacity>
        <View style={styles.grow} />
        <CustomText style={styles.subtitle}>About the Speaker</CustomText>
        <View style={styles.grow} />
      </View>
      <ScrollView>
        <View style={styles.modal}>
          <View style={styles.center}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 120 : 100,
                height: Platform.OS === 'ios' ? 120 : 100,
                borderRadius: 60
              }}
              source={{ uri: data.speaker.image }}
            />
            <CustomText style={styles.h1}>{data.speaker.name}</CustomText>
          </View>
          <CustomText style={styles.paragraph}>{data.speaker.bio}</CustomText>
          <TouchableOpacity
            onPress={() => Linking.openURL(`${data.speaker.url}`)}
            title='Read More on Wikipedia'
            accessibilityLabel='Read more about the speaker on Wikipedia'
          >
            <Button>Read More on Wikipedia</Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

Speaker.propTypes = {
  data: PropTypes.shape({
    speaker: PropTypes.objectOf(PropTypes.string).isRequired
  }),
  navigation: PropTypes.object.isRequired
};

export default Speaker;
