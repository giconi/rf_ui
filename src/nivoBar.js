// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import {ResponsiveBar} from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const MyResponsiveBar = ({ data,title,index="ticker",keys=["value"],axisLeft="value"}) => (
    <div class="h-96">
              <div class="border-black border-0 items-center justify-center flex">
    {title}
    </div>
    <div class="border-black border-2  rounded-lg h-96">
    <ResponsiveBar
        data={data}
        keys={
           keys
        }
        indexBy={index}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
       
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        /*colors={{ scheme: 'nivo' }} */
        colors={{ datum: 'data.color' }}
        axisTop={null}
        axisRight={null}
       /* axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'stock',
            legendPosition: 'middle',
            legendOffset: 32
        }} */
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: axisLeft,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        /*legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}*/
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
    </div>
    </div>
)

export default MyResponsiveBar