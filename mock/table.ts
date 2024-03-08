export default [
  // 获取用户信息
  {
    url: '/api/home-list/page',
    method: 'get',
    response: (request) => {
      const { pageNum, pageSize, nickname, groupId, username, status } = request.query

      // 模拟数据库查询数据
      const userList = createList().filter((user) => {
        return (
          (!nickname || user.nickname.includes(nickname)) &&
          (!groupId || user.groupId === groupId) &&
          (!username || user.username.includes(username)) &&
          (!status || (user.enabled ? 'enabled' : 'disabled') === status)
        )
      })
      const total = userList.length
      const start = (pageNum - 1) * pageSize
      const end = pageNum * pageSize

      const paginatedUsers = userList.slice(start, end)

      if (paginatedUsers.length === 0) {
        return { code: 201, data: { message: 'No data found!' } }
      }
      return {
        code: 200,
        data: {
          records: paginatedUsers,
          total: total,
          size: pageSize,
          current: pageNum,
          orders: [],
          optimizeCountSql: true,
          searchCount: true,
          countId: null,
          maxLimit: null,
          pages: Math.ceil(total / pageSize),
        },
        message: 'Success',
      }
    },
  },
]

// 模拟表格数据
function createList() {
  return createRandomData(120)
}
//数据的类型
interface UserData {
  tenantId: string
  userId: string
  username: string
  nickname: string
  mobileNo: string
  emailNo: string
  groupId: string
  groupName: string
  enabled: boolean
  roleId: string
  roleName: string
  primaryAccount: boolean
  createdTime: string
  remark: string | null
}
//循环创建假数据
function createRandomData(num: Number): UserData[] {
  const data: UserData[] = []
  const roles = ['admin', 'user', 'guest']
  const groups = ['group1', 'group2', 'group3']

  for (let i = 0; i < num; i++) {
    const randomUser: UserData = {
      tenantId: '1390101533310976',
      userId: Math.floor(Math.random() * 1000000000000000000).toString(),
      username: `user${i}`,
      nickname: `nickname${i}`,
      mobileNo: Math.random() > 0.5 ? `155${Math.floor(Math.random() * 100000000)}` : '',
      emailNo: Math.random() > 0.5 ? `user${i}@example.com` : '',
      groupId: '1711554161315098626',
      groupName: groups[Math.floor(Math.random() * groups.length)],
      enabled: Math.random() > 0.5,
      roleId: Math.floor(Math.random() * 1000000000000000000).toString(),
      roleName: roles[Math.floor(Math.random() * roles.length)],
      primaryAccount: Math.random() > 0.5,
      createdTime: generateRandomDate(),
      remark: Math.random() > 0.5 ? `remark${i}` : null,
    }

    data.push(randomUser)
  }

  return data
}

//时间进行格式化 结果'2023-10-10 09:28:06'格式
function generateRandomDate(): string {
  const year = Math.floor(Math.random() * (2023 - 2010 + 1)) + 2010
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1 // Assume every month has 28 days for simplicity
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)
  const second = Math.floor(Math.random() * 60)

  const formattedMonth = month < 10 ? `0${month}` : `${month}`
  const formattedDay = day < 10 ? `0${day}` : `${day}`
  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`
  const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`
  const formattedSecond = second < 10 ? `0${second}` : `${second}`

  return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`
}
