import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const ModalOverlay = ({
  children,
  onClose,
}: ModalOverlayProps): React.JSX.Element | null => {
  return (
    <div className={styles.root} onClick={onClose}>
      {children}
    </div>
  );
};
