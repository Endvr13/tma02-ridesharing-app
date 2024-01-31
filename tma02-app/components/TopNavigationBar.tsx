import { Icon, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useTheme } from "./theme-context";
import { FunctionComponentElement, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const ToggleThemeButton = () => {
    const { theme, toggleTheme } = useTheme();
    const toggleIcon = (props: any) => (
        <Icon {...props} name={theme === "light" ? "moon-outline" : "sun-outline"} />
    );
    return (
        <TopNavigationAction icon={toggleIcon} onPress={toggleTheme} />
    );
};
const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back'/>
  );

const BackAction = () => {
    const navigation = useNavigation();

    const onBackPress = () => {
        navigation.goBack();
        
    };

    return (   
        <TopNavigationAction icon={BackIcon} onPress={onBackPress}/>
    );
};

type TopNavigationBarProps = {
    title: () => React.JSX.Element
    showBackButton: boolean;
};

const TopNavigationBar = ({ title, showBackButton }: TopNavigationBarProps) => {

    const { theme } = useTheme();

    useEffect(() => {
    }, [theme]);
    return (
        <TopNavigation
            title={title}
            alignment="center"
            accessoryLeft={showBackButton ? BackAction : undefined}
            accessoryRight={ToggleThemeButton}
            style={{ backgroundColor: theme === "light" ?  '#D9E4FF': 'rgb(21, 26, 48)'}}
            
        />
    );
};  

export default TopNavigationBar;