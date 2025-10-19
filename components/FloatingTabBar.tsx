
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 24,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const activeIndex = tabs.findIndex((tab) => {
    if (tab.route === '/(tabs)/(home)/') {
      return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
    }
    return pathname.includes(tab.name);
  });

  const translateX = useSharedValue(0);

  React.useEffect(() => {
    const tabWidth = containerWidth / tabs.length;
    translateX.value = withSpring(activeIndex * tabWidth, {
      damping: 20,
      stiffness: 90,
    });
  }, [activeIndex, containerWidth, tabs.length]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  const tabWidth = containerWidth / tabs.length;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.safeArea, { marginBottom: bottomMargin }]}
    >
      <BlurView
        intensity={80}
        tint={theme.dark ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            width: containerWidth,
            borderRadius,
            backgroundColor: Platform.OS === 'ios' 
              ? 'transparent' 
              : theme.dark 
                ? 'rgba(30, 30, 30, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              borderRadius: borderRadius - 4,
              backgroundColor: colors.primary,
            },
            indicatorStyle,
          ]}
        />
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const scale = useSharedValue(1);

          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [{ scale: scale.value }],
            };
          });

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <Animated.View style={[styles.tabContent, animatedStyle]}>
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? colors.card : colors.text}
                />
                <Text
                  style={[
                    styles.label,
                    {
                      color: isActive ? colors.card : colors.text,
                      fontWeight: isActive ? '600' : '400',
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  indicator: {
    position: 'absolute',
    height: 56,
    top: 4,
    left: 4,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    marginTop: 4,
  },
});
