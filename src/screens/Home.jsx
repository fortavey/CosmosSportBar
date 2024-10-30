import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import BackgroundImage from '../assets/bg/home_bg.png';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {PRODUCTS, TRANSLATE} from '../helpers/urls';
import FoodCard from '../components/FoodCard';
import {toCapitalize} from '../helpers/functions';

const {width, height} = Dimensions.get('window');

export default function Home() {
  const {lang, refresh, setRefresh} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('starters');
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const getProductsRequest = useGetRequest({url: PRODUCTS});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const getProducts = async () => {
    const {response} = await getProductsRequest.request();
    if (response?.length) {
      setProducts(response);
    }
  };

  useEffect(() => {
    getLanguages();
    getProducts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <Header back={false} background={COLORS.black} />

        {translations?.length ? (
          <View>
            <View style={styles.main}>
              <TouchableOpacity
                style={
                  selectedCategory === 'starters'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('starters');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'starters'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {toCapitalize(
                    translations.find(item => item?.en === 'starters')[lang],
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  selectedCategory === 'salads'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('salads');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'salads'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {toCapitalize(
                    translations.find(item => item?.en === 'salads')[lang],
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  selectedCategory === 'desserts'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('desserts');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'desserts'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {toCapitalize(
                    translations.find(item => item?.en === 'desserts')[lang],
                  )}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedCategory === 'drinks'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('drinks');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'drinks'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {toCapitalize(
                    translations.find(item => item?.en === 'drinks')[lang],
                  )}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.mainScroll}>
              {products?.length && selectedCategory
                ? products
                    .filter(pro => pro.type === selectedCategory)
                    .map((item, index) => (
                      <FoodCard
                        item={item}
                        key={index}
                        translations={translations}
                      />
                    ))
                : ''}
            </ScrollView>
          </View>
        ) : (
          ''
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: width,
    height: height,
  },
  activeCategory: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  inactiveCategory: {
    width: '45%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
  },
  activeCategoryText: {
    color: COLORS.white,
    fontSize: 19,
    fontFamily: FONTS.extraBold,
  },
  inActiveCategoryText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  mainScroll: {
    paddingHorizontal: 20,
    paddingBottom: 300,
  },
  main: {
    height: Dimensions.get('window').height / 7.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
});
