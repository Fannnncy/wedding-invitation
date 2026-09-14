const dashboard = document.querySelector('#dashboard-view')
const login = document.querySelector('#login-view')
const guestList = document.querySelector('#guest-list')
const emptyList = document.querySelector('#empty-list')
const filter = document.querySelector('#accommodation-filter')
const storageKey = 'wedding-local-rsvps'
let rsvps = []

function readRecords() {
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
    return Array.isArray(value) ? value : []
  } catch { return [] }
}

function formatDate(value) {
  if (!value) return '未记录'
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Shanghai' }).format(new Date(value))
}

function text(parent, value, className = '') {
  const node = document.createElement('p')
  node.textContent = value
  if (className) node.className = className
  parent.append(node)
}

function render() {
  rsvps = readRecords()
  document.querySelector('#stat-replies').textContent = String(rsvps.length)
  document.querySelector('#stat-guests').textContent = String(rsvps.reduce((total, item) => total + Number(item.partySize || 0), 0))
  document.querySelector('#stat-accommodation').textContent = String(rsvps.filter((item) => item.needsAccommodation).length)
  const visible = rsvps.filter((item) => filter.value === 'all' || (filter.value === 'yes') === Boolean(item.needsAccommodation))
  guestList.replaceChildren()
  emptyList.hidden = visible.length > 0
  visible.forEach((item) => {
    const entry = document.createElement('article')
    entry.className = 'guest-entry'
    const identity = document.createElement('div')
    const name = document.createElement('h2'); name.textContent = item.guestName
    identity.append(name); text(identity, item.phone || '未留电话')
    const accommodation = document.createElement('div')
    const badge = document.createElement('span'); badge.className = `attendance-badge ${item.needsAccommodation ? '' : 'no'}`; badge.textContent = item.needsAccommodation ? '需要住宿' : '无需住宿'
    accommodation.append(badge)
    const party = document.createElement('div'); text(party, '出席人数', 'guest-entry-label'); text(party, `${item.partySize} 人`)
    const dates = document.createElement('div'); text(dates, '住宿时间', 'guest-entry-label'); text(dates, item.needsAccommodation ? `${String(item.checkInAt).replace('T', ' ')} 至 ${String(item.checkOutAt).replace('T', ' ')}` : '无需住宿')
    const message = document.createElement('div'); text(message, '留言祝福', 'guest-entry-label'); text(message, item.message || '没有留言', 'guest-message')
    const updated = document.createElement('div'); text(updated, '最后更新', 'guest-entry-label'); text(updated, formatDate(item.updatedAt), 'guest-date')
    entry.append(identity, accommodation, party, dates, message, updated)
    guestList.append(entry)
  })
}

login.hidden = true
dashboard.hidden = false
document.querySelector('#logout-button').textContent = '返回邀请函'
document.querySelector('#logout-button').addEventListener('click', () => { window.location.href = '/' })
document.querySelector('#refresh-button').addEventListener('click', render)
filter.addEventListener('change', render)
document.querySelector('#export-button').addEventListener('click', () => {
  const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
  const rows = [['姓名', '出席人数', '是否需要住宿', '入住时间', '退房时间', '联系电话', '留言祝福', '最后更新']]
  rsvps.forEach((item) => rows.push([item.guestName, item.partySize, item.needsAccommodation ? '需要' : '无需', item.checkInAt || '', item.checkOutAt || '', item.phone, item.message, item.updatedAt]))
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([`\uFEFF${rows.map((row) => row.map(escape).join(',')).join('\n')}`], { type: 'text/csv;charset=utf-8' })); link.download = `婚礼宾客名单-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(link.href)
})
render()
