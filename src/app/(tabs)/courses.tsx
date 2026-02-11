import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Header from '../../components/Header';

const courses = [
    {
        id: 1,
        name: 'Mathematics',
        teacher: 'Dr. Smith',
        progress: 75,
        lessons: 24,
        completed: 18,
        color: '#3B82F6',
        icon: 'calculator',
    },
    {
        id: 2,
        name: 'Physics',
        teacher: 'Mr. Johnson',
        progress: 60,
        lessons: 20,
        completed: 12,
        color: '#8B5CF6',
        icon: 'flask',
    },
    {
        id: 3,
        name: 'English Literature',
        teacher: 'Ms. Davis',
        progress: 90,
        lessons: 18,
        completed: 16,
        color: '#10B981',
        icon: 'book',
    },
    {
        id: 4,
        name: 'History',
        teacher: 'Mr. Wilson',
        progress: 45,
        lessons: 22,
        completed: 10,
        color: '#F59E0B',
        icon: 'time',
    },
    {
        id: 5,
        name: 'Computer Science',
        teacher: 'Ms. Chen',
        progress: 85,
        lessons: 30,
        completed: 25,
        color: '#EC4899',
        icon: 'code-slash',
    },
    {
        id: 6,
        name: 'Art & Design',
        teacher: 'Mr. Paint',
        progress: 70,
        lessons: 16,
        completed: 11,
        color: '#6366F1',
        icon: 'color-palette',
    },
];

export default function CoursesScreen() {
    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            <Header
                title="My Courses"
                showAvatar={true}
                showNotification={true}
                rightComponent={
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={20} color="#1F2937" />
                    </TouchableOpacity>
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Progress Overview */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    style={styles.overviewCard}
                >
                    <View style={styles.overviewItem}>
                        <Text style={styles.overviewValue}>6</Text>
                        <Text style={styles.overviewLabel}>Enrolled</Text>
                    </View>
                    <View style={styles.overviewDivider} />
                    <View style={styles.overviewItem}>
                        <Text style={styles.overviewValue}>72%</Text>
                        <Text style={styles.overviewLabel}>Avg Progress</Text>
                    </View>
                    <View style={styles.overviewDivider} />
                    <View style={styles.overviewItem}>
                        <Text style={styles.overviewValue}>92</Text>
                        <Text style={styles.overviewLabel}>Completed</Text>
                    </View>
                </Animated.View>

                {/* Course List */}
                {courses.map((course, index) => (
                    <Animated.View
                        key={course.id}
                        entering={FadeInDown.delay(300 + index * 80).duration(600)}
                    >
                        <TouchableOpacity style={styles.courseCard} activeOpacity={0.7}>
                            <View style={[styles.courseIcon, { backgroundColor: course.color + '15' }]}>
                                <Ionicons name={course.icon as any} size={24} color={course.color} />
                            </View>
                            <View style={styles.courseInfo}>
                                <Text style={styles.courseName}>{course.name}</Text>
                                <Text style={styles.courseTeacher}>{course.teacher}</Text>
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBar}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                { width: `${course.progress}%`, backgroundColor: course.color },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.progressText}>{course.progress}%</Text>
                                </View>
                            </View>
                            <View style={styles.courseMeta}>
                                <Text style={styles.lessonCount}>
                                    {course.completed}/{course.lessons}
                                </Text>
                                <Text style={styles.lessonLabel}>lessons</Text>
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
        paddingTop: 120,
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
    filterBtn: {
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
    overviewCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    overviewItem: {
        flex: 1,
        alignItems: 'center',
    },
    overviewValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#3B82F6',
        marginBottom: 4,
    },
    overviewLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    overviewDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
    },
    courseCard: {
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
    courseIcon: {
        width: 50,
        height: 50,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    courseInfo: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    courseTeacher: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBar: {
        flex: 1,
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        width: 36,
    },
    courseMeta: {
        alignItems: 'center',
        marginLeft: 12,
    },
    lessonCount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
    },
    lessonLabel: {
        fontSize: 11,
        color: '#9CA3AF',
    },
});
