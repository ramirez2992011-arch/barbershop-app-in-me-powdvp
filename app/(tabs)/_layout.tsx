
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Inicio',
    },
    {
      name: 'barbers',
      route: '/(tabs)/barbers',
      icon: 'person.2.fill',
      label: 'Barberos',
    },
    {
      name: 'booking',
      route: '/(tabs)/booking',
      icon: 'calendar',
      label: 'Reservar',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Perfil',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Inicio</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="barbers">
          <Icon sf="person.2.fill" drawable="ic_barbers" />
          <Label>Barberos</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="booking">
          <Icon sf="calendar" drawable="ic_booking" />
          <Label>Reservar</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Perfil</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="barbers" />
        <Stack.Screen name="booking" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
