import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;

// Mock data
const upcomingExams = [
  {
    id: 1,
    title: 'Mathematics Final',
    date: 'Dec 12, 10:00 AM',
    daysLeft: 2,
    importance: 'High Importance',
    importanceColor: '#EF4444',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
  },
  {
    id: 2,
    title: 'History Midterm',
    date: 'Dec 15, 2:00 PM',
    daysLeft: 5,
    importance: 'Medium',
    importanceColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400',
  },
  {
    id: 3,
    title: 'Physics Lab',
    date: 'Dec 18, 9:00 AM',
    daysLeft: 8,
    importance: 'Low',
    importanceColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
  },
];

const assignments = [
  {
    id: 1,
    title: 'Physics Lab Re...',
    subject: 'Science • Mr. Johnson',
    due: 'Tomorrow',
    dueColor: '#EF4444',
    icon: 'flask',
    iconBg: '#3B82F6',
  },
  {
    id: 2,
    title: 'English Essay Draft',
    subject: 'English • Ms. Davis',
    due: 'Friday',
    dueColor: '#6B7280',
    icon: 'document-text',
    iconBg: '#8B5CF6',
  },
  {
    id: 3,
    title: 'Art History Quiz',
    subject: 'Art • Mr. Paint',
    due: 'Done',
    dueColor: '#10B981',
    icon: 'checkmark-circle',
    iconBg: '#10B981',
  },
];

export default function DashboardScreen() {
  const [attendance] = useState(85);

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
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Good Morning,</Text>
              <Text style={styles.userName}>Sarah</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </Animated.View>

        {/* Attendance Card */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.attendanceCard}
        >
          <View style={styles.attendanceHeader}>
            <Text style={styles.attendanceLabel}>Overall Attendance</Text>
            <View style={styles.trendIcon}>
              <Ionicons name="trending-up" size={20} color="#3B82F6" />
            </View>
          </View>
          <Text style={styles.attendanceValue}>{attendance}%</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${attendance}%` }]} />
          </View>
          <Text style={styles.attendanceMessage}>You're doing great! Keep it up.</Text>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.statsRow}
        >
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="ribbon" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statLabel}>GPA</Text>
            <Text style={styles.statValue}>3.8</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="trophy" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statLabel}>Rank</Text>
            <Text style={styles.statValue}>12th</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="book" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statLabel}>Courses</Text>
            <Text style={styles.statValue}>6</Text>
          </View>
        </Animated.View>

        {/* Upcoming Exams */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.sectionHeader}
        >
          <Text style={styles.sectionTitle}>Upcoming Exams</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.examsScroll}
        >
          {upcomingExams.map((exam, index) => (
            <Animated.View
              key={exam.id}
              entering={FadeInRight.delay(500 + index * 100).duration(600)}
            >
              <TouchableOpacity style={styles.examCard} activeOpacity={0.9}>
                <Image source={{ uri: exam.image }} style={styles.examImage} />
                <View style={styles.examBadge}>
                  <Text style={styles.examBadgeText}>In {exam.daysLeft} Days</Text>
                </View>
                <View style={styles.examContent}>
                  <Text style={styles.examTitle}>{exam.title}</Text>
                  <View style={styles.examDateRow}>
                    <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                    <Text style={styles.examDate}>{exam.date}</Text>
                  </View>
                  <View style={[styles.importanceBar, { backgroundColor: exam.importanceColor }]} />
                  <Text style={[styles.importanceText, { color: exam.importanceColor }]}>
                    {exam.importance}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Due Assignments */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.sectionHeader}
        >
          <Text style={styles.sectionTitle}>Due Assignments</Text>
        </Animated.View>

        {assignments.map((assignment, index) => (
          <Animated.View
            key={assignment.id}
            entering={FadeInDown.delay(700 + index * 100).duration(600)}
          >
            <TouchableOpacity style={styles.assignmentCard} activeOpacity={0.7}>
              <View style={[styles.assignmentIcon, { backgroundColor: assignment.iconBg }]}>
                <Ionicons name={assignment.icon as any} size={20} color="#fff" />
              </View>
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
              </View>
              <View style={styles.assignmentRight}>
                <Text style={[styles.assignmentDue, { color: assignment.dueColor }]}>
                  {assignment.due}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Bottom spacing for tab bar */}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  greeting: {},
  greetingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  attendanceCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendanceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  trendIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceValue: {
    fontSize: 42,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  attendanceMessage: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
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
  examsScroll: {
    paddingRight: 20,
    marginBottom: 24,
  },
  examCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  examImage: {
    width: '100%',
    height: 100,
  },
  examBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  examBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  examContent: {
    padding: 14,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  examDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  examDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  importanceBar: {
    height: 3,
    borderRadius: 2,
    marginBottom: 8,
  },
  importanceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  assignmentCard: {
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
  assignmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  assignmentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assignmentDue: {
    fontSize: 13,
    fontWeight: '600',
  },
});
