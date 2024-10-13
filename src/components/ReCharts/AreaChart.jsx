import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';


export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-area-chart-4y9cnl';
 
  render() {
    const { data } = this.props;
    const isFinance = data[0]?.revenue !== undefined;
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
            width={400}
            height={350}
            data={data}
            margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {isFinance ? (
            <>
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#003f88" 
                fill="#00509e" 
                name="Revenue" 
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#0077b6" 
                fill="#0096c7" 
                name="Expenses" 
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#00b4d8" 
                fill="#48cae4" 
                name="Profit" 
              />
            </>
          ) : (
            <>
              <Area 
                type="monotone" 
                dataKey="onlineSales" 
                stroke="#003f88" 
                fill="#00509e" 
                name="Online Sales" 
              />
              <Area 
                type="monotone" 
                dataKey="offlineSales" 
                stroke="#0077b6" 
                fill="#0096c7" 
                name="Offline Sales" 
              />
              <Area 
                type="monotone" 
                dataKey="totalSales" 
                stroke="#00b4d8" 
                fill="#48cae4" 
                name="Total Sales" 
              />
            </>
          )}
            <Legend verticalAlign="bottom" height={36} />
            </AreaChart>
        </ResponsiveContainer>
    );
  }
}
