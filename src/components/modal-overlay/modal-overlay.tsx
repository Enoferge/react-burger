import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const ModalOverlay = ({
  children,
  onClose,
}: TModalOverlayProps): React.JSX.Element | null => {
  return (
    <div className={styles.root} onClick={onClose}>
      {children}
    </div>
  );
};
