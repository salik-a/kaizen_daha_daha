import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { MainScreen, DetailScreen, PortalScreen, WalletScreen } from "../screens"

import { colors, spacing, typography } from "../theme"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

export type TabBarParamList = {
  MainScreen: undefined
  DetailScreen: undefined
  PortalScreen: undefined
  WalletScreen: undefined
  Main: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabBarScreenProps<T extends keyof TabBarParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabBarParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type AppStackParamList = {
  // 🔥 Your screens go here
  Main: undefined
  MainScreen: undefined
  DetailScreen: { Id: number }
  PortalScreen: undefined
  WalletScreen: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: colors.background }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  )
}

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        backgroundColor: "white",
        elevation: 7,
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      {state.routes.map(
        (
          route: { key: string | number; name: any; params: any },
          index: { toString: () => React.Key | null | undefined },
        ) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index
          const TabIcon = options.tabBarIcon

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            })
          }

          if (route.name === "PortalScreen") {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index.toString()}
              >
                <Icon
                  icon="portal"
                  size={80}
                  style={{ top: -50, position: "absolute", alignSelf: "center" }}
                />
              </View>
            )
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              key={index.toString()}
            >
              <TabIcon focused={isFocused} />
              <Text style={[$tabBarLabel, { color: isFocused ? colors.text : "#222" }]}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        },
      )}
    </View>
  )
}

const Tab = createBottomTabNavigator<TabBarParamList>()

/**
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `TabBarNavigator`.
 */
export function TabBarNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarLabel: translate("tabBarNavigator.discover"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="discover" color={focused ? colors.black : colors.border} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="PortalScreen"
        component={PortalScreen}
        options={{
          tabBarLabel: translate("tabBarNavigator.discover"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="discover" color={focused ? colors.black : colors.border} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          tabBarLabel: translate("tabBarNavigator.wallet"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="star" color={focused ? colors.black : colors.border} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
