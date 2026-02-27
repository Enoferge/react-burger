import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './price.module.css';

type TPriceProps = {
  price: number;
  size?: 'S' | 'M';
  count?: number;
};

export const Price = ({ price, size = 'S', count }: TPriceProps): React.JSX.Element => {
  const displayPrice = Math.max(0, price);

  return (
    <div className={styles.wrapper}>
      <span
        className={`text ${size === 'S' ? 'text_type_digits-default' : 'text_type_digits-medium'}`}
      >
        {count ? `${count} x ` : undefined}
        {displayPrice}
      </span>
      <CurrencyIcon
        type="primary"
        className={size === 'S' ? styles.iconS : styles.iconM}
      />
    </div>
  );
};
