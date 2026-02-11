import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import Header from './Header';

// Mock data for Multiple Children
const childrenData = [
    {
        id: 1,
        name: 'Leo',
        fullName: 'Leo Johnson',
        class: 'Class 4 - B',
        image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=200',
        attendance: 95,
        attendanceStatus: 'Present Today',
        attendanceColor: '#10B981',
        activities: [
            { id: 1, title: 'Report Card Uploaded', desc: 'Fall Semester grades', time: '2h ago', icon: 'star', color: '#10B981' },
            { id: 2, title: 'New Message', desc: 'Mrs. Jones: Don\'t forget...', time: 'Yesterday', icon: 'mail', color: '#F59E0B' },
        ],
        upcoming: [
            { id: 1, title: 'Math Test', date: 'Tomorrow, 10:00 AM', room: 'Room 302', type: 'exam', color: '#EF4444' },
            { id: 2, title: 'School Play', date: 'Friday, 06:00 PM', room: 'Auditorium', type: 'event', color: '#3B82F6' },
        ]
    },
    {
        id: 2,
        name: 'Mia',
        fullName: 'Mia Johnson',
        class: 'Class 8 - A',
        image: 'https://images.unsplash.com/photo-1517677130605-abb7ca91d172?w=200',
        attendance: 88,
        attendanceStatus: 'Absent Today',
        attendanceColor: '#EF4444',
        activities: [
            { id: 1, title: 'Assignment Due', desc: 'History Essay due tomorrow', time: '1h ago', icon: 'alert-circle', color: '#EF4444' },
            { id: 2, title: 'Class Photo', desc: 'School picture day photos', time: '3 days ago', icon: 'camera', color: '#3B82F6' },
        ],
        upcoming: [
            { id: 1, title: 'Science Fair', date: 'Dec 15, 09:00 AM', room: 'Gymnasium', type: 'event', color: '#8B5CF6' },
        ]
    },
    {
        id: 3,
        name: 'Noah',
        fullName: 'Noah Johnson',
        class: 'Kindergarten',
        image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=200',
        attendance: 98,
        attendanceStatus: 'Present Today',
        attendanceColor: '#10B981',
        activities: [
            { id: 1, title: 'Vaccination Due', desc: 'Flu shot reminder', time: '1 week ago', icon: 'medical', color: '#EC4899' },
        ],
        upcoming: [
            { id: 1, title: 'Field Trip', date: 'Dec 20, 08:30 AM', room: 'Zoo', type: 'trip', color: '#F59E0B' },
        ]
    }
];

const quickActions = [
    { id: 1, label: 'Absence', icon: 'sad-outline', color: '#3B82F6', bg: '#EFF6FF' },
    { id: 2, label: 'Message', icon: 'chatbubble-outline', color: '#3B82F6', bg: '#EFF6FF' },
    { id: 3, label: 'Fees', icon: 'card-outline', color: '#3B82F6', bg: '#EFF6FF' },
    { id: 4, label: 'Timetable', icon: 'calendar-outline', color: '#3B82F6', bg: '#EFF6FF' },
];

export default function ParentDashboard() {
    const [selectedChildId, setSelectedChildId] = useState(1);

    const currentChild = childrenData.find(c => c.id === selectedChildId) || childrenData[0];

    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            <Header
                showGreeting={true}
                showAvatar={true}
                showNotification={true}
                userName="Sarah"
                avatarUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Children Selector */}
                <View style={styles.childrenContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.childrenList}>
                        {childrenData.map((child, index) => {
                            const isSelected = child.id === selectedChildId;
                            return (
                                <Animated.View
                                    key={child.id}
                                    entering={FadeInRight.delay(100 + index * 100).duration(600)}
                                >
                                    <TouchableOpacity
                                        style={styles.childItem}
                                        onPress={() => setSelectedChildId(child.id)}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[
                                            styles.avatarWrapper,
                                            isSelected && styles.avatarSelected
                                        ]}>
                                            <Image source={{ uri: child.image }} style={styles.childAvatar} />
                                        </View>
                                        <Text style={[
                                            styles.childName,
                                            isSelected && styles.childNameSelected
                                        ]}>{child.name}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    {quickActions.map((action, index) => (
                        <Animated.View
                            key={action.id}
                            entering={FadeInDown.delay(200 + index * 50).duration(500)}
                            style={styles.actionItemWrapper}
                        >
                            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
                                <View style={[styles.actionIcon, { backgroundColor: action.bg }]}>
                                    <Ionicons name={action.icon as any} size={24} color={action.color} />
                                </View>
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Attendance Section */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(600)}
                    style={styles.sectionHeader}
                >
                    <Text style={styles.sectionTitle}>Attendance</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>Details</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    key={`attendance-${currentChild.id}`}
                    entering={FadeInDown.delay(500).duration(600)}
                    style={styles.attendanceCard}
                >
                    <View>
                        <Text style={styles.attendanceLabel}>Overall Rate</Text>
                        <Text style={styles.attendancePercentage}>{currentChild.attendance}%</Text>
                        <View style={styles.attendanceStatusRow}>
                            <View style={[styles.statusDot, { backgroundColor: currentChild.attendanceColor }]} />
                            <Text style={styles.attendanceStatus}>{currentChild.attendanceStatus}</Text>
                        </View>
                    </View>

                    {/* Circular Progress Placeholder */}
                    <View style={styles.circularProgress}>
                        <View style={[styles.circularBorder, { borderColor: userStatusColor(currentChild.attendance) }]} />
                        <Ionicons name="checkmark-circle" size={32} color={userStatusColor(currentChild.attendance)} />
                    </View>
                </Animated.View>


                {/* Upcoming Section */}
                <Animated.View
                    entering={FadeInDown.delay(600).duration(600)}
                    style={styles.sectionHeader}
                >
                    <Text style={styles.sectionTitle}>Upcoming</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See Calendar</Text>
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.upcomingList}>
                    {currentChild.upcoming.map((event, index) => (
                        <Animated.View
                            key={event.id}
                            entering={FadeInDown.delay(700 + index * 100).duration(600)}
                        >
                            <TouchableOpacity style={styles.eventCard}>
                                <View style={[styles.dateStrip, { backgroundColor: event.color }]} />
                                <View style={styles.eventContent}>
                                    <View>
                                        <Text style={[styles.eventDateLabel, { color: event.color }]}>
                                            {event.type === 'exam' ? 'TOMORROW' : 'UPCOMING'}
                                        </Text>
                                        <Text style={styles.eventDateValue}>{event.date.split(',')[0]}</Text>
                                    </View>
                                    <View style={styles.eventDetails}>
                                        <Text style={styles.eventTitle}>{event.title}</Text>
                                        <Text style={styles.eventRoom}>{event.date.split(',')[1]} • {event.room}</Text>
                                    </View>
                                    <View style={[styles.eventIconSmall, { backgroundColor: event.color + '20' }]}>
                                        <Ionicons
                                            name={event.type === 'exam' ? 'alert' : 'calendar'}
                                            size={18}
                                            color={event.color}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Recent Activity */}
                <Animated.View
                    entering={FadeInDown.delay(800).duration(600)}
                    style={styles.sectionHeader}
                >
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                </Animated.View>

                <View style={styles.activityList}>
                    {currentChild.activities.map((activity, index) => (
                        <Animated.View
                            key={activity.id}
                            entering={FadeInDown.delay(900 + index * 100).duration(600)}
                        >
                            <TouchableOpacity style={styles.activityItem}>
                                <View style={[styles.activityIconWrapper, { backgroundColor: activity.color + '20' }]}>
                                    <Ionicons name={activity.icon as any} size={20} color={activity.color} />
                                </View>
                                <View style={styles.activityInfo}>
                                    <Text style={styles.activityTitle}>{activity.title}</Text>
                                    <Text style={styles.activityDesc}>{activity.desc}</Text>
                                </View>
                                <Text style={styles.activityTime}>{activity.time}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Bottom spacing for tab bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

function userStatusColor(percentage: number) {
    if (percentage >= 90) return '#3B82F6';
    if (percentage >= 75) return '#F59E0B';
    return '#EF4444';
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingTop: 120,
        paddingHorizontal: 20,
    },
    childrenContainer: {
        marginBottom: 24,
    },
    childrenList: {
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
        flexGrow: 1,
        justifyContent: 'center',
    },
    childItem: {
        alignItems: 'center',
        gap: 8,
    },
    avatarWrapper: {
        padding: 3,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    avatarSelected: {
        borderColor: '#3B82F6',
    },
    childAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5E7EB',
    },
    addChildBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    childName: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    childNameSelected: {
        color: '#3B82F6',
        fontWeight: '700',
    },
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    actionItemWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    actionItem: {
        alignItems: 'center',
        gap: 8,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },
    seeAll: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '600',
    },
    attendanceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    attendanceLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    attendancePercentage: {
        fontSize: 36,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 8,
    },
    attendanceStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    attendanceStatus: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
    },
    circularProgress: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularBorder: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 40,
        borderWidth: 8,
        opacity: 0.2,
    },
    upcomingList: {
        gap: 12,
        marginBottom: 24,
    },
    eventCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
        minHeight: 80,
    },
    dateStrip: {
        width: 6,
        height: '100%',
    },
    eventContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    eventDateLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    eventDateValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 2,
    },
    eventRoom: {
        fontSize: 13,
        color: '#6B7280',
    },
    eventIconSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityList: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    activityIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    activityDesc: {
        fontSize: 12,
        color: '#6B7280',
    },
    activityTime: {
        fontSize: 11,
        color: '#9CA3AF',
    },
});
