import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
    title?: string;
    showGreeting?: boolean;
    showAvatar?: boolean;
    showNotification?: boolean;
    showSettings?: boolean;
    userName?: string;
    avatarUrl?: string;
    onNotificationPress?: () => void;
    onSettingsPress?: () => void;
    onAvatarPress?: () => void;
    rightComponent?: React.ReactNode;
}

export default function Header({
    title,
    showGreeting = false,
    showAvatar = true,
    showNotification = true,
    showSettings = false,
    userName = 'Sarah',
    avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    onNotificationPress,
    onSettingsPress,
    onAvatarPress,
    rightComponent,
}: HeaderProps) {
    const insets = useSafeAreaInsets();

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning,';
        if (hour < 17) return 'Good Afternoon,';
        return 'Good Evening,';
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
            <View style={styles.header}>
                {/* Left Side: Avatar + Greeting/Title */}
                <View style={styles.headerLeft}>
                    {showAvatar && (
                        <TouchableOpacity
                            style={styles.avatar}
                            onPress={onAvatarPress}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={{ uri: avatarUrl }}
                                style={styles.avatarImage}
                            />
                        </TouchableOpacity>
                    )}
                    <View style={styles.titleContainer}>
                        {showGreeting ? (
                            <>
                                <Text style={styles.greetingText}>{getGreeting()}</Text>
                                <Text style={styles.userName}>{userName}</Text>
                            </>
                        ) : (
                            <Text style={styles.title}>{title}</Text>
                        )}
                    </View>
                </View>

                {/* Right Side: Actions */}
                <View style={styles.headerRight}>
                    {rightComponent}

                    {showNotification && (
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={onNotificationPress}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    )}

                    {showSettings && (
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={onSettingsPress}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="settings-outline" size={22} color="#1F2937" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F8FAFC',
        zIndex: 100,
        paddingHorizontal: 20,
        paddingBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flex: 1,
    },
    greetingText: {
        fontSize: 14,
        color: '#6B7280',
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
});
