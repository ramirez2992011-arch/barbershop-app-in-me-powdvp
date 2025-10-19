
import React from "react";
import { ScrollView, Pressable, StyleSheet, View, Text, Image, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { barbers, services, reviews } from "@/data/barbershops";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";

export default function BarberDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const barber = barbers.find(b => b.id === id);
  const barberReviews = reviews.filter(r => r.barberId === id);
  const barberServices = services.filter(s => barber?.services.includes(s.id));

  if (!barber) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={styles.errorText}>Barbero no encontrado</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: barber.name,
          headerBackTitle: "Atrás",
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Barber Header */}
          <View style={styles.header}>
            <Image source={{ uri: barber.image }} style={styles.barberImage} />
            <View style={styles.headerInfo}>
              <Text style={styles.barberName}>{barber.name}</Text>
              <Text style={styles.barberSpecialty}>{barber.specialty}</Text>
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" color={colors.accent} size={20} />
                <Text style={styles.ratingText}>{barber.rating}</Text>
                <Text style={styles.reviewCount}>({barber.reviewCount} reseñas)</Text>
              </View>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acerca de</Text>
            <Text style={styles.bioText}>{barber.bio}</Text>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disponibilidad</Text>
            <View style={styles.availabilityContainer}>
              {barber.availability.map((schedule, index) => (
                <View key={index} style={styles.availabilityItem}>
                  <IconSymbol name="clock" color={colors.primary} size={18} />
                  <Text style={styles.availabilityText}>{schedule}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <View style={styles.servicesContainer}>
              {barberServices.map((service) => (
                <View key={service.id} style={styles.serviceCard}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>${service.price} MXN</Text>
                  </View>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <Text style={styles.serviceDuration}>Duración: {service.duration} min</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reseñas</Text>
            <View style={styles.reviewsContainer}>
              {barberReviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerAvatar}>
                      <IconSymbol name="person.fill" color={colors.card} size={20} />
                    </View>
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>{review.userName}</Text>
                      <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <IconSymbol
                            key={i}
                            name={i < review.rating ? "star.fill" : "star"}
                            color={colors.accent}
                            size={14}
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString('es-MX', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Text>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Book Button */}
          <Pressable
            style={styles.bookButton}
            onPress={() => router.push('/(tabs)/booking')}
          >
            <Text style={styles.bookButtonText}>Reservar con {barber.name}</Text>
          </Pressable>
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
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  barberImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  headerInfo: {
    alignItems: 'center',
  },
  barberName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  barberSpecialty: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  availabilityContainer: {
    gap: 8,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
  },
  availabilityText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  servicesContainer: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  serviceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  serviceDuration: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  reviewsContainer: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  reviewComment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.card,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
});
