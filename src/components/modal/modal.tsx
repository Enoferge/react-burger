import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals-root');

type TModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({
  title,
  children,
  onClose,
}: TModalProps): React.JSX.Element | null => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return (): void => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`${styles.root} p-10 pb-15`}
        onClick={(e) => e.stopPropagation()}
        data-cy="modal"
      >
        <div className={styles.header}>
          {title && <h2 className={`text text_type_main-large`}>{title}</h2>}
          <div
            className={styles.closeIcon}
            data-cy="modal-close"
            onClick={onClose}
            role="button"
            tabIndex={0}
          >
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
