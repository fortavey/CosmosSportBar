import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BackIcon from '../assets/images/back_icon.png';
import DrawerIcon from '../assets/images/drawer_icon.png';
import {useNavigation} from '@react-navigation/native';

export default function Header({
  background,
  back = true,
  drawer = true,
  route = null,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <TouchableOpacity
        onPress={() => {
          if (route) {
            navigation.navigate(route);
          } else {
            navigation.goBack();
          }
        }}>
        {back ? <Image source={BackIcon} style={styles.backIcon} /> : ''}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {drawer ? <Image source={DrawerIcon} style={styles.drawerIcon} /> : ''}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 17,
    height: 19,
    objectFit: 'contain',
  },
  drawerIcon: {
    width: 17,
    height: 25,
    objectFit: 'contain',
  },
});
