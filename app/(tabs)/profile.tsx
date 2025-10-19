
import React from "react";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar Sesión', style: 'destructive', onPress: () => console.log('Logout') },
    ]);
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Mi Perfil",
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
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.fill" color={colors.card} size={48} />
            </View>
            <Text style={styles.userName}>Juan Pérez</Text>
            <Text style={styles.userEmail}>juan.perez@email.com</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Visitas</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" color={colors.accent} size={20} />
                <Text style={styles.statNumber}>4.8</Text>
              </View>
              <Text style={styles.statLabel}>Calificación</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Próximas</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mi Cuenta</Text>
            <View style={styles.menuContainer}>
              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="calendar" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Mis Citas</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>

              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="heart.fill" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Barberos Favoritos</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>

              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="clock" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Historial</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Configuración</Text>
            <View style={styles.menuContainer}>
              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.textSecondary }]}>
                    <IconSymbol name="person.fill" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Editar Perfil</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>

              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.textSecondary }]}>
                    <IconSymbol name="bell.fill" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Notificaciones</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>

              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.textSecondary }]}>
                    <IconSymbol name="creditcard.fill" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Métodos de Pago</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Soporte</Text>
            <View style={styles.menuContainer}>
              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="questionmark.circle.fill" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Ayuda y Soporte</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>

              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="info.circle.fill" color={colors.card} size={20} />
                  </View>
                  <Text style={styles.menuItemText}>Acerca de</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>
            </View>
          </View>

          {/* Logout Button */}
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <IconSymbol name="arrow.right.square.fill" color={colors.card} size={20} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.card,
    marginLeft: 8,
  },
});
