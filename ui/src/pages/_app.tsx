import axios from 'axios'
import { SWRConfig } from 'swr'
import '../global.css'

import dayjs from 'dayjs'

var customParseFormat = require('dayjs/plugin/customParseFormat')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)


// import App from 'next/app'
const fetcher = url => axios.get(url).then(res => res.data)

function MyApp({ Component, pageProps }) {
    return <SWRConfig value={{ fetcher, refreshInterval: 30 }}>
        <Component {...pageProps} />
    </SWRConfig>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp