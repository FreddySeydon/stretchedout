 
import React from "react";
import { YStack, Paragraph, Separator, Theme } from "tamagui";
	import { Platform } from 'react-native'

import { StatusBar } from "expo-status-bar";

import EditScreenInfo from "../components/edit-screen-info";

export default function ModalScreen() {
    
        return (
			<Theme name="light">
				<YStack flex={1} alignItems="center" justifyContent="center">
					<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
					<Paragraph>Modal</Paragraph>
					<Separator />
					<EditScreenInfo path="app/modal.tsx" />
				</YStack>
			</Theme>
		);
    
}

