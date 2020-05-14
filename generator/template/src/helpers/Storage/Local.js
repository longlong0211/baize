import { Manage } from './Manage'
import proxyWraper from './Proxy'
const ManageProxy = proxyWraper(new Manage(window.localStorage))
export default ManageProxy
