import styles from './app-header.module.css';

export const getNavLinkClassName =
  (baseClassName?: string) =>
  ({ isActive }: { isActive: boolean }): string => {
    const classes: string[] = [styles.link];

    if (isActive) {
      classes.push(styles.link_active);
    }

    if (baseClassName) {
      classes.push(baseClassName);
    }

    return classes.join(' ');
  };
