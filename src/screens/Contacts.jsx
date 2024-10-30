import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest, usePostRequest} from '../helpers/hooks';
import {BOOKING, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../assets/bg/translation_bg.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonLight from '../components/ButtonLight';
import LoadingModal from '../components/LoadingModal';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function Contacts() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const bookingRequest = usePostRequest({url: BOOKING});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const booking = async () => {
    setLoading(true);
    const {response} = await bookingRequest.request();
    if (response) {
      navigation.navigate('BookConfirm');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <Header />

        {translations?.length ? (
          <View>
            <Text style={styles.title}>
              Contacts
            </Text>

            <View style={styles.main}>
              <ScrollView>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.drawerText}
                  placeholder={
                   "Germany"
                  }
                  editable={false}
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.drawerText}
                  placeholder={
                    "München"
                  }
                  editable={false}
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.drawerText}
                  placeholder={
                     "Goethepl. 2"
                  }
                  editable={false}
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.drawerText}
                  placeholder={
                    "80337"
                  }
                  editable={false}
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.drawerText}
                  placeholder={
                    "+498959918122"
                  }
                  editable={false}
                />
              </ScrollView>
            </View>

            <View style={{marginTop: 50}}>
              
            </View>
          </View>
        ) : (
          ''
        )}
      </ImageBackground>

      {!translations?.length || loading ? <LoadingModal /> : ''}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    padding: 50,
    fontSize: 18,
    textAlign: 'center',
  },
  main: {
    width: '100%',
    backgroundColor: COLORS.yellow,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  textInput: {
    height: 45,
    backgroundColor: COLORS.inputBackground,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 20,
    fontFamily: FONTS.medium,
    marginBottom: 10,
  },
});
