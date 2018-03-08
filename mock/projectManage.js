import { parse } from 'url'

// mock tableListDataSource
let tableListDataSource = []
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    "id": i,
    "project_name": `project ${i}`,
    "company": `深圳华大智造有限公司 ${i}`,
    "sample_receive_date": new Date(`2018-02-${Math.floor(i / 2) + 1}`),
    "latest_delivery_date": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    "address": '这是一段描述',
    "contacts": '小老虎',
    "contact_phone": '185123456789',
    "hard_disk_number": `TradeCode ${i}`,
    "send_date": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    "send_logistics": 'not know',
    "send_single_number": '123456',
    "return_date": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    "return_logistics": '顺丰',
    "return_single_number": '顺丰12345',
    "content": ['this is a content 1', 'this is a content 2'],
    "date_added": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    "date_modified": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
    "user": 1
  })
}

export function getProjectManage (req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query

  let dataSource = [...tableListDataSource]

  if (params.sorter) {
    const s = params.sorter.split('_')
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]]
      }
      return prev[s[0]] - next[s[0]]
    })
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1)
  }

  let pageSize = 10
  if (params.pageSize) {
    pageSize = params.pageSize * 1
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1
    }
  }

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function postProjectManage (req, res, u, b) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body
  const { method, no, description } = body

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1)
      break
    case 'post':
      const i = Math.ceil(Math.random() * 10000)
      tableListDataSource.unshift({
        "id": i,
        "project_name": `project ${i}`,
        "company": `深圳华大智造有限公司 ${i}`,
        "sample_receive_date": new Date(`2018-02-${Math.floor(i / 2) + 1}`),
        "latest_delivery_date": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
        "address": '这是一段描述',
        "contacts": '小老虎',
        "contact_phone": '185123456789',
        "hard_disk_number": `TradeCode ${i}`,
        "send_date": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
        "send_logistics": 'not know',
        "send_single_number": '123456',
        "return_date": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
        "return_logistics": '顺丰',
        "return_single_number": '顺丰12345',
        "content": ['this is a content 1', 'this is a content 2'],
        "date_added": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
        "date_modified": new Date(`2018-03-${Math.floor(i / 2) + 1}`),
        "user": 1         
      })
      break
    default:
      break
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length
    }
  }

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export default {getProjectManage, postProjectManage}
