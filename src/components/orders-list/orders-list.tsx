import { useState } from 'react';

const orderTest = {
  id: '034535',
  name: 'Death Star Starship Main бургер',
};

type TOrderListProps = {
  className?: string;
};

export const OrdersList = ({ className }: TOrderListProps): React.JSX.Element => {
  const [orders] = useState([orderTest, orderTest]);

  return (
    <section className={className}>
      {orders.map((o) => (
        <div key={o.id}>{o.name}</div>
      ))}
    </section>
  );
};
