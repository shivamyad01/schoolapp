import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const menuItems = [
    { id: 1, icon: 'person-outline', label: 'Edit Profile', color: '#3B82F6' },
    { id: 2, icon: 'notifications-outline', label: 'Notifications', color: '#F59E0B' },
    { id: 3, icon: 'lock-closed-outline', label: 'Privacy & Security', color: '#10B981' },
    { id: 4, icon: 'help-circle-outline', label: 'Help & Support', color: '#8B5CF6' },
    { id: 5, icon: 'document-text-outline', label: 'Terms & Conditions', color: '#6B7280' },
];

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(600)}
                    style={styles.header}
                >
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity style={styles.settingsBtn}>
                        <Ionicons name="settings-outline" size={22} color="#1F2937" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Profile Card */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    style={styles.profileCard}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarBtn}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>Sarah Johnson</Text>
                    <Text style={styles.userEmail}>sarah.johnson@school.edu</Text>
                    <Text style={styles.userClass}>Class 12 • Section A</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>3.8</Text>
                            <Text style={styles.statLabel}>GPA</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12th</Text>
                            <Text style={styles.statLabel}>Rank</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>85%</Text>
                            <Text style={styles.statLabel}>Attendance</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Menu Items */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(600)}
                    style={styles.menuCard}
                >
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index !== menuItems.length - 1 && styles.menuItemBorder,
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                                <Ionicons name={item.icon as any} size={20} color={item.color} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                        </TouchableOpacity>
                    ))}
                </Animated.View>

                {/* Logout Button */}
                <Animated.View entering={FadeInDown.delay(400).duration(600)}>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={handleLogout}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Text style={styles.version}>Version 1.0.0</Text>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
    },
    settingsBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    userClass: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '600',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#F3F4F6',
    },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#1F2937',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        borderRadius: 16,
        padding: 16,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
    },
    version: {
        textAlign: 'center',
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 20,
    },
});
