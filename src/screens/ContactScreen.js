import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/colors';

const CONTACT_INFO = {
  phone: '+92 300 1234567',
  email: 'info@csmotors.pk',
  address: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
  hours: 'Mon - Sat: 10:00 AM - 8:00 PM',
  whatsapp: '+923001234567',
};

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = useCallback(() => {
    Linking.openURL(`tel:${CONTACT_INFO.whatsapp}`);
  }, []);

  const handleEmail = useCallback(() => {
    Linking.openURL(`mailto:${CONTACT_INFO.email}`);
  }, []);

  const handleWhatsApp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${CONTACT_INFO.whatsapp.replace('+', '')}`);
  }, []);

  const handleLocation = useCallback(() => {
    const address = encodeURIComponent(CONTACT_INFO.address);
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically send the form data to your backend
    Alert.alert(
      'Message Sent!',
      'Thank you for contacting us. We will get back to you soon.',
      [{ text: 'OK' }]
    );

    // Clear form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  }, [name, email, message]);

  const ContactCard = ({ icon, title, subtitle, onPress, color = COLORS.primary }) => (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={onPress}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel={`${title}: ${subtitle}`}
      accessibilityRole="button"
    >
      <View style={[styles.contactIconContainer, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.contactCardContent}>
        <Text style={styles.contactCardTitle}>{title}</Text>
        <Text style={styles.contactCardSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>We'd love to hear from you</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>CS Motors</Text>
                <Text style={styles.heroSubtitle}>Your Premium Car Destination</Text>
                <View style={styles.heroStats}>
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>10+</Text>
                    <Text style={styles.heroStatLabel}>Years</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>500+</Text>
                    <Text style={styles.heroStatLabel}>Happy Clients</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>100%</Text>
                    <Text style={styles.heroStatLabel}>Authentic</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Contact</Text>
            
            <ContactCard
              icon="call"
              title="Phone"
              subtitle={CONTACT_INFO.phone}
              onPress={handleCall}
            />
            
            <ContactCard
              icon="logo-whatsapp"
              title="WhatsApp"
              subtitle="Send us a message"
              onPress={handleWhatsApp}
              color="#25D366"
            />
            
            <ContactCard
              icon="mail"
              title="Email"
              subtitle={CONTACT_INFO.email}
              onPress={handleEmail}
            />
            
            <ContactCard
              icon="location"
              title="Location"
              subtitle={CONTACT_INFO.address}
              onPress={handleLocation}
              color={COLORS.accent}
            />
            
            <ContactCard
              icon="time"
              title="Business Hours"
              subtitle={CONTACT_INFO.hours}
              onPress={() => {}}
              color={COLORS.warning}
            />
          </View>

          {/* Contact Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Send a Message</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name *</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your full name"
                  placeholderTextColor={COLORS.textMuted}
                  accessible={true}
                  accessibilityLabel="Name input"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessible={true}
                  accessibilityLabel="Email input"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="03XX-XXXXXXX"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="phone-pad"
                  accessible={true}
                  accessibilityLabel="Phone input"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="How can we help you?"
                  placeholderTextColor={COLORS.textMuted}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  accessible={true}
                  accessibilityLabel="Message input"
                />
              </View>
              
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
                accessible={true}
                accessibilityLabel="Send message"
                accessibilityRole="button"
              >
                <Text style={styles.submitButtonText}>Send Message</Text>
                <Ionicons name="send" size={18} color={COLORS.background} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                style={styles.socialButton}
                accessible={true}
                accessibilityLabel="Facebook"
                accessibilityRole="button"
              >
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                accessible={true}
                accessibilityLabel="Instagram"
                accessibilityRole="button"
              >
                <Ionicons name="logo-instagram" size={24} color="#E4405F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                accessible={true}
                accessibilityLabel="YouTube"
                accessibilityRole="button"
              >
                <Ionicons name="logo-youtube" size={24} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                accessible={true}
                accessibilityLabel="Twitter"
                accessibilityRole="button"
              >
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: 4,
  },
  heroSection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingLarge,
  },
  heroGradient: {
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    color: COLORS.background,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: SIZES.radius,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  heroStatItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heroStatNumber: {
    color: COLORS.background,
    fontSize: 20,
    fontWeight: '800',
  },
  heroStatLabel: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 11,
    marginTop: 4,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  section: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingLarge,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactCardContent: {
    flex: 1,
    marginLeft: 16,
  },
  contactCardTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  contactCardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  formContainer: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusSmall,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    marginTop: 8,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '700',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ContactScreen;
