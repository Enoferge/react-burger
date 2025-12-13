import orderDetailsImage from '@/images/order-success.png';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  id?: number;
};

export const OrderDetails = ({ id }: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={`${styles.root} pt-4 pb-15`}>
      <span className={'text text_type_digits-large'}>{id ?? '??????'}</span>
      <span className={'text text_type_main-medium mt-8'}>идентификатор заказа</span>
      <img
        className={'mt-15 mb-15'}
        alt="Заказ успешно создан"
        src={orderDetailsImage}
      />
      <span className={'text text_type_main-default'}>Ваш заказ начали готовить</span>
      <span className={'text text_type_main-default text_color_inactive mt-2'}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
