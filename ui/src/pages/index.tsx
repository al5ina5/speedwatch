import dayjs from "dayjs";
import useSWR from "swr";
import prettyBytes from 'pretty-bytes'
import Box from "../components/Box";
import Chart from "../components/Chart";
import test from "node:test";
import classNames from "classnames";
import dynamic from "next/dynamic";
import Averages from "../components/Averages";

const Table = dynamic(() => import('../components/Table'))

export default function Index() {
    const { data: unsortedData } = useSWR('/api/data')
    const tests = unsortedData && unsortedData.tests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    const latest = tests && tests[0]

    if (!latest) return 'loading...'
    return <div className="p-6 lg:p-12 space-y-6">
        <div>
            <p className="text-xs lg:text-lg opacity-50 text-right">Last Updated {dayjs(latest.timestamp).fromNow()}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Box title="Download" titleClassName="text-green-400">
                <div className="space-y-2 text-center">
                    <p className="text-5xl font-white">
                        <span>{(latest.download.bandwidth / 125000).toFixed(2)}</span>
                        <span className="text-2xl opacity-50"> mbps</span>
                    </p>
                    <p className="text-lg">{latest.download.bandwidth} bytes</p>
                </div>
            </Box>
            <Box title="Upload" titleClassName="text-red-400">
                <div className="space-y-2 text-center">
                    <p className="text-5xl font-white">
                        <span>{(latest.upload.bandwidth / 125000).toFixed(2)}</span>
                        <span className="text-2xl opacity-50"> mbps</span>
                    </p>
                    <p className="text-lg">{latest.upload.bandwidth} bytes</p>
                </div>
            </Box>
            <Box title="Ping" titleClassName="text-purple-400">

                <div className="space-y-2 text-center">
                    <p className="text-5xl font-white">
                        <span>{latest.ping.latency.toFixed(2)}</span>
                        <span className="text-2xl opacity-50"> ms</span>
                    </p>
                    <p className="text-lg space-x-6">
                        <span className="text-green-400 opacity-50">{latest.ping.low} ms</span>
                        <span className="text-red-400 opacity-50">{latest.ping.high} ms</span>
                    </p>
                </div>
            </Box>

        </div >

        {/* <Averages /> */}

        <Chart />
        <Table />

        <div>
            <p className="text-lg opacity-50 text-right">
                <a href={latest.result.url}>View latest on Ookla</a>
            </p>
        </div>
    </div >
}