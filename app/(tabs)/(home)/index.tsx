
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Image, TextInput, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { barbers, services } from "@/data/barbershops";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredBarbers = barbers.slice(0, 3);
  const popularServices = services.slice(0, 4);

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push('/(tabs)/profile')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="person.fill" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Barbería México",
            headerRight: renderHeaderRight,
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
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Bienvenido a</Text>
            <Text style={styles.titleText}>Barbería México</Text>
            <Text style={styles.subtitleText}>Tu estilo, nuestra pasión</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar barberos o servicios..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Promotion Banner */}
          <View style={styles.promotionBanner}>
            <View style={styles.promotionContent}>
              <Text style={styles.promotionTitle}>¡Oferta Especial!</Text>
              <Text style={styles.promotionText}>20% de descuento en tu primera visita</Text>
              <Pressable style={styles.promotionButton}>
                <Text style={styles.promotionButtonText}>Reservar Ahora</Text>
              </Pressable>
            </View>
            <View style={styles.promotionIcon}>
              <IconSymbol name="scissors" color={colors.card} size={48} />
            </View>
          </View>

          {/* Featured Barbers */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Barberos Destacados</Text>
              <Pressable onPress={() => router.push('/barbers')}>
                <Text style={styles.seeAllText}>Ver Todos</Text>
              </Pressable>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {featuredBarbers.map((barber) => (
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
                      <IconSymbol name="star.fill" color={colors.accent} size={14} />
                      <Text style={styles.ratingText}>{barber.rating}</Text>
                      <Text style={styles.reviewCount}>({barber.reviewCount})</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Popular Services */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Servicios Populares</Text>
            </View>
            <View style={styles.servicesGrid}>
              {popularServices.map((service) => (
                <Pressable
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() => router.push('/booking')}
                >
                  <View style={styles.serviceIcon}>
                    <IconSymbol name="scissors" color={colors.primary} size={24} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>${service.price} MXN</Text>
                  <Text style={styles.serviceDuration}>{service.duration} min</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
            <View style={styles.quickActions}>
              <Pressable 
                style={styles.quickActionCard}
                onPress={() => router.push('/booking')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="calendar" color={colors.card} size={28} />
                </View>
                <Text style={styles.quickActionText}>Reservar Cita</Text>
              </Pressable>
              <Pressable 
                style={styles.quickActionCard}
                onPress={() => router.push('/barbers')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.accent }]}>
                  <IconSymbol name="person.2.fill" color={colors.card} size={28} />
                </View>
                <Text style={styles.quickActionText}>Ver Barberos</Text>
              </Pressable>
            </View>
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
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
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
  promotionBanner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  promotionContent: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.card,
    marginBottom: 4,
  },
  promotionText: {
    fontSize: 14,
    color: colors.card,
    marginBottom: 12,
  },
  promotionButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  promotionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingRight: 16,
  },
  barberCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginRight: 16,
    width: 160,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  barberImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  barberInfo: {
    padding: 12,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  barberSpecialty: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  serviceDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  headerButtonContainer: {
    padding: 6,
  },
});
