import dayjs from "dayjs";
import useSWR from "swr";

export default function Averages() {
    const { data: unsortedData } = useSWR('/api/data')
    const tests = unsortedData && unsortedData.tests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    const lastFiveMinutes = tests && tests.filter(test => dayjs(Date.now()).diff(test.timestamp, 'minute') < 5)
    const lastHour = tests && tests.filter(test => dayjs(Date.now()).diff(test.timestamp, 'minute') < 60)
    const lastMonth = tests && tests.filter(test => dayjs(Date.now()).diff(test.timestamp, 'month') < 1)
    const average = array => array?.reduce((a, b) => a + b) / array.length

    if (!lastFiveMinutes || !lastHour || !lastMonth) return <></>
    return <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded p-6 text-center">
                <p className="text-2xl">{average(lastFiveMinutes.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps</p>
                <p className="text-lg">5 Mins</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded p-6 text-center">
                <p className="text-2xl">{average(lastHour.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps</p>
                <p className="text-lg">1 Hour</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded p-6 text-center">
                <p className="text-2xl">{average(lastMonth.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps</p>
                <p className="text-lg">1 Month</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded p-6 text-center">
                <p className="text-2xl">{average(tests.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps</p>
                <p className="text-lg">All Times</p>
            </div>
        </div>

        {/* <Box title="Average Download" titleClassName="text-green-400 text-base">
            <div className="text-center">
                <p>{average(lastFiveMinutes.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps in the 5 minutes.</p>
                <p>{average(lastHour.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps in the last hour.</p>
                <p>{average(lastMonth.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps in the last month.</p>
                <p>{average(tests.map(test => (test.download.bandwidth / 125000))).toFixed(2)} mbps overall.</p>
            </div>
        </Box> */}
    </>
}