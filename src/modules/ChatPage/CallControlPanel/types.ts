export interface IControlButtonProps {
  onClick?: () => void;
}

export interface IControlToggleButtonProps extends IControlButtonProps {
  value?: boolean;
}
