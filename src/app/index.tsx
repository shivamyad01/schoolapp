import { Redirect } from 'expo-router';

export default function Index() {
    // Redirect to login page when app starts
    return <Redirect href="/login" />;
}
