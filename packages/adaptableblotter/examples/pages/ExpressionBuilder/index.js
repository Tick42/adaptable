import { createContext, useState } from 'react';
import './index.css';
import Builder from './Builder';
import compute from './compute';

const columns = [
  { name: 'orderId', label: 'Order ID' },
  { name: 'price', label: 'Price' },
  { name: 'companyName', label: 'Company Name' },
];
const sampleData = {
  orderId: 5,
  price: 12.9,
  companyName: 'AB',
};
export const ExpressionContext = createContext('expression');

function Root() {
  const [config, setConfig] = useState({
    type: 'if',
    condition: {
      type: 'compare',
      operator: '>',
      operand1: {
        type: 'column',
        value: 'price',
      },
      operand2: {
        type: 'number',
        value: 50,
      },
    },
    trueValue: {
      type: 'string',
      value: 'expensive',
    },
    falseValue: {
      type: 'string',
      value: 'cheap',
    },
  });
  // const [config, setConfig] = useState({
  //   type: 'min',
  //   values: [
  //     {
  //       type: 'multiply',
  //       values: [
  //         {
  //           type: 'column',
  //           value: 'price',
  //         },
  //         {
  //           type: 'number',
  //           value: 2,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'number',
  //       value: 100,
  //     },
  //   ],
  // });
  return (
    <ExpressionContext.Provider value={{ columns }}>
      <Builder config={config} setConfig={setConfig} />
      <pre>result = {String(compute(config, sampleData))}</pre>
      <pre>expression = {JSON.stringify(config, 0, 2)}</pre>
      <pre>data = {JSON.stringify(sampleData, 0, 2)}</pre>
    </ExpressionContext.Provider>
  );
}

export default Root;
