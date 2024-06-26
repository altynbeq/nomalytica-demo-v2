import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import { ChartsHeader } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';

const Doughnut = ({ id, data, legendVisiblity, height, width, title}) => {
  const { currentMode } = useStateContext();
  const tooltipColor = currentMode === 'Dark' ? '#33373E' : '#fff';

  return (
    <div>
      <ChartsHeader title={title}  />
      <AccumulationChartComponent
        id={id}
        legendSettings={{ visible: legendVisiblity,  background: "white", alignment: 'Center', enableHighlight: legendVisiblity}}
        height={height}
        width={width}
        background={currentMode === 'Dark' ? '#33373E' : '#fff'}
        tooltip={{ enable: true }}
      >
        <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            name="Sale"
            dataSource={data}
            xName="x"
            yName="y"
            innerRadius="40%"
            startAngle={0}
            endAngle={360}
            radius="70%"
            explode
            explodeOffset="10%"
            explodeIndex={2}
            dataLabel={{
              visible: true,
              name: 'text',
              position: 'Inside',
              font: {
                fontWeight: '600',
                color: '#fff',
              },
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
    
  );
};

export default Doughnut;
