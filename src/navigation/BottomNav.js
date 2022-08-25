import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native'
import InputFields from '../components/InputFields';
const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;



const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Add', focusedIcon: 'plus-circle', unfocusedIcon: 'plus' },
    { key: 'albums', title: 'List', focusedIcon: 'album' },
    // { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    // { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: InputFields,
    albums: AlbumsRoute,
    // recents: RecentsRoute,
  });

  return (

    <SafeAreaView style={{
      flex: 1,
    }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
};

export default BottomNav;