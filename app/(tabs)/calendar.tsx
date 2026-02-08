import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const events = [
    {
        id: 1,
        title: 'Mathematics Final',
        time: '10:00 AM - 12:00 PM',
        type: 'exam',
        color: '#EF4444',
    },
    {
        id: 2,
        title: 'Physics Lab',
        time: '2:00 PM - 4:00 PM',
        type: 'class',
        color: '#3B82F6',
    },
    {
        id: 3,
        title: 'Study Group Meeting',
        time: '5:00 PM - 6:30 PM',
        type: 'meeting',
        color: '#10B981',
    },
];

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState(12);
    const currentMonth = 11; // December
    const currentYear = 2024;

    // Generate calendar days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendarDays = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push({ day: null, key: `empty-${i}` });
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({ day: i, key: `day-${i}` });
    }

    const hasEvent = (day: number) => [5, 12, 15, 18, 22, 25].includes(day);

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
                    <Text style={styles.title}>Calendar</Text>
                    <TouchableOpacity style={styles.todayBtn}>
                        <Text style={styles.todayBtnText}>Today</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Month Navigation */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    style={styles.monthNav}
                >
                    <TouchableOpacity>
                        <Ionicons name="chevron-back" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>
                        {months[currentMonth]} {currentYear}
                    </Text>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward" size={24} color="#1F2937" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Calendar Grid */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(600)}
                    style={styles.calendar}
                >
                    {/* Days of week header */}
                    <View style={styles.weekHeader}>
                        {daysOfWeek.map((day) => (
                            <Text key={day} style={styles.weekDay}>
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Calendar days */}
                    <View style={styles.daysGrid}>
                        {calendarDays.map((item) => (
                            <TouchableOpacity
                                key={item.key}
                                style={[
                                    styles.dayCell,
                                    item.day === selectedDate && styles.dayCellSelected,
                                ]}
                                onPress={() => item.day && setSelectedDate(item.day)}
                                disabled={!item.day}
                            >
                                {item.day && (
                                    <>
                                        <Text
                                            style={[
                                                styles.dayText,
                                                item.day === selectedDate && styles.dayTextSelected,
                                            ]}
                                        >
                                            {item.day}
                                        </Text>
                                        {hasEvent(item.day) && (
                                            <View
                                                style={[
                                                    styles.eventDot,
                                                    item.day === selectedDate && styles.eventDotSelected,
                                                ]}
                                            />
                                        )}
                                    </>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                {/* Events for Selected Date */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(600)}
                    style={styles.eventsHeader}
                >
                    <Text style={styles.eventsTitle}>
                        Events on Dec {selectedDate}
                    </Text>
                </Animated.View>

                {events.map((event, index) => (
                    <Animated.View
                        key={event.id}
                        entering={FadeInDown.delay(500 + index * 80).duration(600)}
                    >
                        <TouchableOpacity style={styles.eventCard} activeOpacity={0.7}>
                            <View style={[styles.eventIndicator, { backgroundColor: event.color }]} />
                            <View style={styles.eventInfo}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <View style={styles.eventTimeRow}>
                                    <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </View>
                            </View>
                            <View style={[styles.eventType, { backgroundColor: event.color + '15' }]}>
                                <Text style={[styles.eventTypeText, { color: event.color }]}>
                                    {event.type}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                ))}

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
    todayBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#3B82F6',
        borderRadius: 20,
    },
    todayBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    monthNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    calendar: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    weekHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    weekDay: {
        flex: 1,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    dayCellSelected: {
        backgroundColor: '#3B82F6',
    },
    dayText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1F2937',
    },
    dayTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    eventDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#3B82F6',
        marginTop: 2,
    },
    eventDotSelected: {
        backgroundColor: '#fff',
    },
    eventsHeader: {
        marginBottom: 16,
    },
    eventsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    eventIndicator: {
        width: 4,
        height: 40,
        borderRadius: 2,
        marginRight: 14,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    eventTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    eventTime: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    eventType: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    eventTypeText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
});
