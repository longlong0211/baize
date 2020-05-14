import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem,
  Select,
  Option,
  Switch,
  Input,
  TimePicker,
  DatePicker,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Upload,
  Tag,
  Loading,
  Notification,
  Message,
  MessageBox,
  Backtop,
  Icon,
  Pagination
} from 'element-ui'

Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Footer)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Form)
  .use(FormItem)
  .use(Select)
  .use(Option)
  .use(Switch)
  .use(Input)
  .use(TimePicker)
  .use(DatePicker)
  .use(Checkbox)
  .use(CheckboxButton)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(Table)
  .use(TableColumn)
  .use(Tabs)
  .use(TabPane)
  .use(Dialog)
  .use(Dropdown)
  .use(DropdownItem)
  .use(DropdownMenu)
  .use(Upload)
  .use(Tag)
  .use(Backtop)
  .use(Icon)
  .use(Pagination)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
const MsgBox = MessageBox
Vue.prototype.$confirm = MsgBox.confirm
Vue.prototype.$ELEMENT = { size: 'middle' }
