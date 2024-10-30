import React, {useContext} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';
import Header from '../components/Header';
import {COLORS} from '../helpers/colors';

export default function Grill() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../assets/event_bg/en_gril.png'),
    ru: require('../assets/event_bg/ru_gril.png'),
    es: require('../assets/event_bg/es_gril.png'),
    it: require('../assets/event_bg/it_gril.png'),
    de: require('../assets/event_bg/de_gril.png'),
    fr: require('../assets/event_bg/fr_gril.png'),
    sw: require('../assets/event_bg/de_gril.png'),
    pl: require('../assets/event_bg/pl_gril.png'),
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        imageStyle={{objectFit: 'cover'}}
        source={images[lang]}
        style={styles.imageBackground}>
        <Header background={COLORS.black} route={'Events'} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: '112%',
  },
});
