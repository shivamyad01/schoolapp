import { useUser } from '@/context/UserContext';
import { StyleSheet, View } from 'react-native';
import ParentDashboard from '../../components/ParentDashboard';
import StudentDashboard from '../../components/StudentDashboard';

export default function DashboardScreen() {
  const { userType } = useUser();

  return (
    <View style={styles.container}>
      {userType === 'student' ? <StudentDashboard /> : <ParentDashboard />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
