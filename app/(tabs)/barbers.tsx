
import React, { useState } from "react";
import { ScrollView, Pressable, StyleSheet, View, Text, Image, TextInput, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { barbers } from "@/data/barbershops";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

export default function BarbersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBarbers = barbers.filter(barber =>
    barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barber.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Nuestros Barberos",
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>Nuestros Barberos</Text>
            <Text style={styles.subtitleText}>Profesionales expertos a tu servicio</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre o especialidad..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Barbers List */}
          <View style={styles.barbersList}>
            {filteredBarbers.map((barber) => (
              <Pressable
                key={barber.id}
                style={styles.barberCard}
                onPress={() => router.push(`/barber/${barber.id}`)}
              >
                <Image source={{ uri: barber.image }} style={styles.barberImage} />
                <View style={styles.barberInfo}>
                  <Text style={styles.barberName}>{barber.name}</Text>
                  <Text style={styles.barberSpecialty}>{barber.specialty}</Text>
                  <View style={styles.ratingContainer}>
                    <IconSymbol name="star.fill" color={colors.accent} size={16} />
                    <Text style={styles.ratingText}>{barber.rating}</Text>
                    <Text style={styles.reviewCount}>({barber.reviewCount} reseñas)</Text>
                  </View>
                  <View style={styles.availabilityContainer}>
                    <IconSymbol name="clock" color={colors.textSecondary} size={14} />
                    <Text style={styles.availabilityText}>{barber.availability[0]}</Text>
                  </View>
                </View>
                <View style={styles.arrowContainer}>
                  <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  barbersList: {
    gap: 16,
  },
  barberCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  barberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  barberInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  barberSpecialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  arrowContainer: {
    padding: 8,
  },
});
