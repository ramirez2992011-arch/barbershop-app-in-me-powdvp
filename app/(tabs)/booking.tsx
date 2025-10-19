
import React, { useState } from "react";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { barbers, services } from "@/data/barbershops";
import { Stack } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen() {
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  const handleBooking = () => {
    if (!selectedBarber || !selectedService || !selectedTime) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const barber = barbers.find(b => b.id === selectedBarber);
    const service = services.find(s => s.id === selectedService);

    Alert.alert(
      'Reserva Confirmada',
      `Tu cita con ${barber?.name} para ${service?.name} está confirmada para el ${selectedDate.toLocaleDateString('es-MX')} a las ${selectedTime}.`,
      [{ text: 'OK' }]
    );
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Reservar Cita",
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
            <Text style={styles.titleText}>Reservar Cita</Text>
            <Text style={styles.subtitleText}>Selecciona tu barbero y servicio preferido</Text>
          </View>

          {/* Select Barber */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Selecciona tu Barbero</Text>
            <View style={styles.optionsContainer}>
              {barbers.map((barber) => (
                <Pressable
                  key={barber.id}
                  style={[
                    styles.optionCard,
                    selectedBarber === barber.id && styles.optionCardSelected
                  ]}
                  onPress={() => setSelectedBarber(barber.id)}
                >
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      selectedBarber === barber.id && styles.optionTitleSelected
                    ]}>
                      {barber.name}
                    </Text>
                    <Text style={styles.optionSubtitle}>{barber.specialty}</Text>
                    <View style={styles.ratingContainer}>
                      <IconSymbol name="star.fill" color={colors.accent} size={14} />
                      <Text style={styles.ratingText}>{barber.rating}</Text>
                    </View>
                  </View>
                  {selectedBarber === barber.id && (
                    <View style={styles.checkmark}>
                      <IconSymbol name="checkmark.circle.fill" color={colors.primary} size={24} />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Select Service */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Selecciona el Servicio</Text>
            <View style={styles.optionsContainer}>
              {services.map((service) => (
                <Pressable
                  key={service.id}
                  style={[
                    styles.optionCard,
                    selectedService === service.id && styles.optionCardSelected
                  ]}
                  onPress={() => setSelectedService(service.id)}
                >
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      selectedService === service.id && styles.optionTitleSelected
                    ]}>
                      {service.name}
                    </Text>
                    <Text style={styles.optionSubtitle}>{service.description}</Text>
                    <View style={styles.serviceDetails}>
                      <Text style={styles.servicePrice}>${service.price} MXN</Text>
                      <Text style={styles.serviceDuration}>{service.duration} min</Text>
                    </View>
                  </View>
                  {selectedService === service.id && (
                    <View style={styles.checkmark}>
                      <IconSymbol name="checkmark.circle.fill" color={colors.primary} size={24} />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Select Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Selecciona la Fecha</Text>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <IconSymbol name="calendar" color={colors.primary} size={20} />
              <Text style={styles.dateButtonText}>
                {selectedDate.toLocaleDateString('es-MX', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Select Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Selecciona la Hora</Text>
            <View style={styles.timeSlots}>
              {timeSlots.map((time) => (
                <Pressable
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.timeSlotSelected
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected
                  ]}>
                    {time}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Confirm Button */}
          <Pressable
            style={[
              styles.confirmButton,
              (!selectedBarber || !selectedService || !selectedTime) && styles.confirmButtonDisabled
            ]}
            onPress={handleBooking}
            disabled={!selectedBarber || !selectedService || !selectedTime}
          >
            <Text style={styles.confirmButtonText}>Confirmar Reserva</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: colors.primary,
  },
  optionSubtitle: {
    fontSize: 14,
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
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  serviceDuration: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  checkmark: {
    marginLeft: 12,
  },
  dateButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timeSlotTextSelected: {
    color: colors.card,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.card,
  },
});
