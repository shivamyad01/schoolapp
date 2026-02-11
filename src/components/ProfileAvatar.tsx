import React, { useState } from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface ProfileAvatarProps {
    uri?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    gender?: 'male' | 'female' | 'neutral';
}

export default function ProfileAvatar({
    uri,
    size = 100,
    style,
    imageStyle,
    gender = 'neutral'
}: ProfileAvatarProps) {
    const [hasError, setHasError] = useState(false);

    // If uri is provided and no error, try to show image
    if (uri && !hasError) {
        return (
            <Image
                source={{ uri }}
                style={[{ width: size, height: size, borderRadius: size / 2 }, imageStyle]}
                onError={() => setHasError(true)}
            />
        );
    }

    // Fallback SVG based on gender preference
    return (
        <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
            <Svg width={size} height={size} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="50" fill="#E2E8F0" />
                {gender === 'female' ? (
                    <G>
                        <Path
                            d="M50 25C41.7157 25 35 31.7157 35 40C35 48.2843 41.7157 55 50 55C58.2843 55 65 48.2843 65 40C65 31.7157 58.2843 25 50 25Z"
                            fill="#94A3B8"
                        />
                        <Path
                            d="M25 80C25 66.1929 36.1929 55 50 55C63.8071 55 75 66.1929 75 80V90H25V80Z"
                            fill="#94A3B8"
                        />
                        {/* Simple hair suggestion */}
                        <Path
                            d="M35 40C35 30 40 20 50 20C60 20 65 30 65 40"
                            stroke="#64748B"
                            strokeWidth="0"
                            fill="none"
                        />
                    </G>
                ) : (
                    <G>
                        <Circle cx="50" cy="40" r="15" fill="#94A3B8" />
                        <Path
                            d="M25 85C25 71.1929 36.1929 60 50 60C63.8071 60 75 71.1929 75 85V95H25V85Z"
                            fill="#94A3B8"
                        />
                    </G>
                )}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
    },
});
