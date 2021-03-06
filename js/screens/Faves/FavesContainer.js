import React, { Component } from 'react';
import { View, ActivityIndicator, Animated, Easing } from 'react-native';
import CustomText from '../../components/CustomText';
import Faves from './Faves';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import FavesContext from '../../context';
import { formatSessionData } from '../../lib/helpers/dataFormatHelpers';
import styles from './styles';

class FavesContainer extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  static navigationOptions = {
    title: 'Faves'
  };

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <Query
        query={gql`
          {
            allSessions {
              id
              title
              description
              location
              startTime
              speaker {
                bio
                id
                image
                name
                url
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <View style={styles.loader}>
                <ActivityIndicator size='large' />
              </View>
            );
          if (error)
            return <CustomText>{`Error! ${error.message}`}</CustomText>;

          return (
            <FavesContext.Consumer>
              {({ faveIds, setFaveId, removeFaveId }) => {
                let filterSessions = data.allSessions.filter(session => {
                  return faveIds.includes(session.id);
                });

                if (filterSessions.length === 0) {
                  return (
                    <View style={styles.container}>
                      <Animated.Image
                        style={{
                          opacity,
                          width: 100,
                          height: 100
                        }}
                        source={require('../../assets/images/heart.png')}
                      />
                      <CustomText style={styles.h1}>
                        Hey, it looks like you don't have any favourites yet.
                      </CustomText>
                    </View>
                  );
                } else {
                  return (
                    <Faves
                      data={formatSessionData(filterSessions)}
                      faveIds={faveIds}
                      navigation={this.props.navigation}
                      setFaveId={setFaveId}
                      removeFaveId={removeFaveId}
                    />
                  );
                }
              }}
            </FavesContext.Consumer>
          );
        }}
      </Query>
    );
  }
}

export default FavesContainer;
