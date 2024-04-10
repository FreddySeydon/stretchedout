 
import React from "react";
import { YStack, Paragraph, Separator, Theme, H2 } from "tamagui";
	import { Platform } from 'react-native'

import { StatusBar } from "expo-status-bar";

export default function ModalScreen() {
    
        return (
			<Theme name="light">
				<YStack flex={1} alignItems="center" justifyContent="center">
					<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
					<Paragraph>Modal</Paragraph>
					<Separator />
					<H2>This will be a modal some day.</H2>
				</YStack>
			</Theme>
		);
    
}

