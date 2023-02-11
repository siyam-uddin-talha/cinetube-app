import { SafeAreaView } from "react-native-safe-area-context";

type UseSafeAreaProps = {
  children: React.ReactNode;
};

export const UseSafeArea = ({ children }: UseSafeAreaProps) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};
