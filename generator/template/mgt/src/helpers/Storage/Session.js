import { Manage } from './Manage'
import proxyWraper from './Proxy'
const ManageProxy = proxyWraper(new Manage(window.sessionStorage))
export default ManageProxy
