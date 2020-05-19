/* eslint-disable no-eval */
import { version } from 'element-ui/lib/element-ui.common'

const $console = {}
for (const key of ['log', 'group', 'groupCollapsed', 'groupEnd']) {
  $console[key] = function () { eval(`console["${key}"].apply(null, arguments)`) }
}

$console.groupCollapsed(process.env.VUE_APP_NAME)
const gitInfo = JSON.parse(process.env.VUE_APP_GIT_INFO) || {}

$console.log(`Version  :%c ${process.env.VUE_APP_VERSION}`, 'color:#0072c6')
$console.log(`ElementUi:%c ${version}`, 'color:#0072c6')
gitInfo.tag && $console.log(`Tag      :%c ${gitInfo.tag}`, 'color:#0072c6')
gitInfo.branch && $console.log(`Branch   :%c ${gitInfo.branch}`, 'color:#0072c6')
gitInfo.sha && $console.log(`Sha      :%c ${gitInfo.sha}`, 'color:#0072c6')
$console.log(`Build  at:%c ${process.env.VUE_APP_BUILD_TIME}`, 'color:#0072c6')
$console.groupEnd()
