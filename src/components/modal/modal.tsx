import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals-root');

type ModalProps = {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps): React.JSX.Element | null => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return (): void => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!modalRoot || !isOpen) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${styles.root} p-10 pb-15`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={`text text_type_main-large`}>{title}</h2>}
          <CloseIcon className={styles.closeIcon} type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
