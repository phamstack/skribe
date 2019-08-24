import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';

import ScheduleScreen from './components/AppStack/ScheduleScreen';
import ClassesScreen from './components/AppStack/ClassesScreen';
import ProfileScreen from './components/AppStack/ProfileScreen';

import PhotoScreen from './components/Classes/PhotoScreen';
import Camera from './components/Classes/Camera';
import NewClass from './components/Classes/NewClass';
import ClassDetail from './components/Classes/ClassDetail';
import FolderDetail from './components/Classes/FolderDetail';

import TaskDetail from './components/Tasks/TaskDetail';
import NewTask from './components/Tasks/NewTask';
import EditTaskDetail from './components/Tasks/EditTaskDetail';

import ProfileSettings from './components/Profile/ProfileSettings';
import SearchScreen from './components/Profile/SearchScreen';

import LoginScreen from './components/Authen/LoginScreen';
import SplashScreen from './components/Authen/SplashScreen';
import SignUpScreen from './components/Authen/SignUpScreen';
import WalkthroughScreen from './components/Authen/WalkthroughScreen';

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Splash: {
            screen: SplashScreen
        },
        SignUp: {
            screen: SignUpScreen
        },
        Walkthrough: {
            screen: WalkthroughScreen
        }
    },
    {
        initialRouteName: 'Login'
    }
);

const ScheduleStack = createStackNavigator({
    Schedule: {
        screen: ScheduleScreen
    },
    TaskDetail: {
        screen: TaskDetail
    },
    NewTask: {
        screen: NewTask
    },
    EditTaskDetail: {
        screen: EditTaskDetail
    }
});

const ClassesStack = createStackNavigator({
    Classes: {
        screen: ClassesScreen
    },
    Class: {
        screen: ClassDetail
    },
    Folder: {
        screen: FolderDetail
    },
    NewClass: {
        screen: NewClass,
        navigationOptions: {
            mode: 'modal'
        }
    },
    Camera: {
        //screen: CameraScreen,
        screen: Camera,
        navigationOptions: {
            header: null
        }
    },
    Photo: {
        screen: PhotoScreen
    }
});

ClassesStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index == 3 || navigation.state.index == 4) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen
    },
    Settings: {
        screen: ProfileSettings
    },
    Search: {
        screen: SearchScreen
    }
});

const AppStack = createBottomTabNavigator({
    Schedule: {
        screen: ScheduleStack,
        navigationOptions: {
            tabBarLabel: 'To Do',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-calendar" color={tintColor} size={24} />
            )
        }
    },
    Classes: {
        screen: ClassesStack,
        navigationOptions: {
            tabBarLabel: 'Classes',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-albums" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-person" color={tintColor} size={24} />
            )
        }
    }
});

export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Auth'
        }
    )
);
