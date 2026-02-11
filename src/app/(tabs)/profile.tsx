import { useUser } from '@/context/UserContext';
import { StyleSheet, View } from 'react-native';
import ParentProfile from '../../components/ParentProfile';
import StudentProfile from '../../components/StudentProfile';

export default function ProfileScreen() {
    const { userType } = useUser();

    return (
        <View style={styles.container}>
            {userType === 'student' ? <StudentProfile /> : <ParentProfile />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
});
