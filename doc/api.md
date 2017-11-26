# API

/login (post)
req: {
  username: string,
  password: string
}
res: {
  status: string,
  isAdmin: boolean
}

/buildings (get)
req: {
  'username': '',
  'password': '',
  buildinglist
}
res: {
  buildings: [
    {
      id: number,
      name: string
    }
  ]
}

/msc (get)
req: {
  buildingId: number
}
res: {
}

/opi (get)
req: {
  buildingId: number
}
res: {
}

/sos/header (get)
req: {
  buildingId: number
}

/sos/data (get)
req: {
  buildingId: number,
  timeFrom: string, ("yyyy-mm-dd-hh"),
  timeTo: string ("yyyy-mm-dd-hh")
  (两头都要包括)
}
res: {
  step: number, (小时)
  temperature: {
    sensorId: {
      sensorName: string,
      data: []
    }
  },
  flow: {
    ...
  },
  pressure: {
    ...
  },
  current: {
    ...
  }
}

/sos/csv (get)
req: {
  buildingId: number,
  sensorsIds: {
    t: [],
    f: [],
    p: [],
    c: []
  },
  timeFrom: string, ("yyyy-mm-dd-hh"),
  timeTo: string ("yyyy-mm-dd-hh")
  (两头都要包括)
}
res: {
  link: string
}

/sos/update (post)
req: {
  buildingId: number,

}
res: {
  status: string
}

## User Management

/user (get)
req: {
  username: string,
  password: string,
  conditions: string, 若为null / ""则返回所有用户

}
res: {
  users: [
  ]
}

/updateUserInfo (post) {
  userId: number,
  newUsername: string,
  newPassword: string,
  newBuildingList: []
}

/user (delete)
req: {
  userId: number
}
res: {
  status: string
}

/user (put)
req: {
  username: string,
  password: string,
  buildingList: []
}

/buildings (put) {

}
