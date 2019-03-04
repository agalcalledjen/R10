import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Text from '../../components/MyAppText';
import Speaker from './Speaker';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// create a component
// (Stateful) Logic and state
class SpeakerContainer extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Speaker'
  };

  render() {
    const { navigation } = this.props;

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
          if (error) return <Text>{`Error! ${error.message}`}</Text>;

          const speakerData = this.props.navigation.getParam('speakerData');
          // console.log(data);
          return <Speaker data={speakerData} navigation={navigation} />;
        }}
      </Query>
    );
  }
}

//make this component available to the app
export default SpeakerContainer;
