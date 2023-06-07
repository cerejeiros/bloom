// This page is the first to load when opening our application the first time.
// It is an opening concise section for what our application does.
// It may have a small show-case of features our application offer.
// At the end it will show options to either log-in or sign-up.

import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import {
    Animated,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";
import Item from "./Item";
import Next from "./Next";
import Paginator from "./Paginator";
import pages, { ItemData } from "./pages";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#98e2ea",
    },
    svg_bottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        fill: 1,
    },
    text: {
        color: colors.black_800,
        fontSize: 25,
        fontFamily: "Poppins-Medium",
        backgroundColor: `${colors.blue_100}55`,
        textAlign: "center",
    },
    text_name: {
        color: colors.rose_300,
    },
    container_page: {
        // backgroundColor: "red",
        justifyContent: "center",
        flex: 2.5,
    },
    container_paginator: {
        justifyContent: "center",
        // backgroundColor: "black",
        paddingHorizontal: "7.5%",
        flex: 0.25,
    },
    container_next: {
        // backgroundColor: "white",
    },
    background_bottom: {
        position: "absolute",
        zIndex: -1,
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
    },
});

export default function OnBoarding() {
    // TODO: For the dots.
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const navigation = useNavigation<NavigationProp<AuthRoutes>>();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const slidesRef = React.useRef<FlatList>(null);

    const viewableItemsChanged = React.useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = React.useRef({
        viewAreaCoveragePercentThreshold: 50,
    }).current;

    const scrollTo = () => {
        if (currentIndex < pages.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            console.log("OnBoarding: last page.");
            navigation.navigate("signIn");
        }
    };

    const { width } = useWindowDimensions();

    Promise.resolve(NavigationBar.setBackgroundColorAsync(colors.white_50));
    Promise.resolve(NavigationBar.setButtonStyleAsync("dark"));

    return (
        <SafeAreaView style={styles.container}>
            {/* All types of optional seen pages should render inside here, we
                can move each page by sliding the upper part of the screen */}
            <View style={styles.container_page}>
                <FlatList
                    data={pages}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            title={item.title}
                            message={item.message}
                            image={item.image}
                        />
                    )}
                    pagingEnabled
                    horizontal
                    keyExtractor={(item: ItemData) => item.id}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                        }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            {/* TODO: Navigation dots here. */}
            <View style={styles.container_paginator}>
                <Paginator data={pages} scrollX={scrollX} />
            </View>
            <View style={styles.container_next}>
                <Next
                    scrollTo={scrollTo}
                    percentage={(currentIndex + 1) * (100 / pages.length)}
                />
            </View>
            <Image
                style={[styles.background_bottom, { width }]}
                source={require("../../../assets/onboarding-bottom.png")}
            />
            {/* TODO: Options to skip page (style) */}
            {/* <SafeAreaView style={styles.nav_container}>
                 <Button
                    title="Registrar"
                    style={styles.button_signup}
                    onPress={() => navigation.navigate("signUp")}
                />
                <Button
                    title="Logar"
                    style={styles.button_login}
                    onPress={() => navigation.navigate("signIn")}
                /> 
            </SafeAreaView> */}
        </SafeAreaView>
    );
}
