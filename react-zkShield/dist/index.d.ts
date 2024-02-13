import React from 'react';

interface ButtonProps {
    label: string;
}
declare const Button: ({ label }: ButtonProps) => React.JSX.Element;

interface ZkShieldProps {
    validate: boolean;
    children: React.ReactElement;
}
type ZkShieldState = {
    userAuthenticated: boolean;
    userAddress: string;
};
declare const AuthContext: React.Context<ZkShieldState>;
declare const ZkShield: (props: ZkShieldProps) => React.JSX.Element;

export { AuthContext, Button, ZkShield };
