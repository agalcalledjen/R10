import React from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Header, HeaderBackButton } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon';
import { colors, fonts } from '../config/styles';

const GradientHeader = props => (
  <View style={{ backgroundColor: 'white', overflow: 'hidden' }}>
    <LinearGradient
      colors={['#cf392a', '#9963ea']}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 0.0 }}
      style={[StyleSheet.absoluteFill, { height: '100%', width: '100%' }]}
    />
    <Header {...props} />
  </View>
);

export const sharedNavigationOptions = navigation => ({
  headerBackTitle: null,
  header: props => <GradientHeader {...props} />,
  headerTintColor: colors.bgLight,
  headerTitleStyle: {
    ...Platform.select({
      ios: { fontSize: fonts.md * 1.1, fontFamily: 'Montserrat' },
      android: {
        fontSize: fonts.md * 1.05,
        fontFamily: fonts.primary
      }
    })
  },
  headerStyle: {
    backgroundColor: 'transparent'
  },
  headerLeft: {
    ...Platform.select({
      ios: (
        <View>
          {navigation.state.routeName === 'Session' ? (
            <HeaderBackButton
              onPress={() => {
                navigation.goBack();
              }}
              tintColor={'white'}
            />
          ) : (
            <View />
          )}
        </View>
      ),
      android: (
        <View>
          {navigation.state.routeName === 'Session' ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name='arrow-back'
                size={25}
                color={colors.bgLight}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon
                name='menu'
                size={25}
                color={colors.bgLight}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          )}
        </View>
      )
    })
  }
});
