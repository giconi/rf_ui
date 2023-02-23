// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/heatmap
import { ResponsiveHeatMap } from '@nivo/heatmap'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveHeatMap = ({ data, title /* see data tab */ }) => (
    <div class="h-96">
        <div class="border-black border-0 items-center justify-center flex">
            {title}
        </div>
        <ResponsiveHeatMap
            data={data}
            margin={{ top: 50, right: 50, bottom: 70, left: 50 }}
            valueFormat=""
            renderCell="rect"
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: '',
                legendOffset: 46
            }}
          /*  axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'strike',
                legendPosition: 'middle',
                legendOffset: 70
            }} */
         /*   axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'strike',
                legendPosition: 'middle',
                legendOffset: -72
            }} */
            colors={{
                type: 'diverging',
                scheme: 'viridis',
                divergeAt: 0.15,
                minValue: 0.15,
                maxValue: 0.40
            }}
            emptyColor="#FFFFFF"
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'brighter',
                        '3'
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'bottom',
                    translateX: 0,
                    translateY: 30,
                    length: 400,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: '',
                    title: 'Expiration →',
                    titleAlign: 'start',
                    titleOffset: 4
                }
            ]}
        />
    </div>
)

export default MyResponsiveHeatMap