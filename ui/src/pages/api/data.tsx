import axios from "axios"

export default async function endpoint(req, res) {
    try {
        const { data } = await axios.get('http://localhost:7777')
        res.send(data)
    } catch (error) {
        res.send(null)
    }
}