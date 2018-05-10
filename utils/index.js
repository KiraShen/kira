
import config from '../config/config.js'

let getBooks = (ctx, cb) => {

  let tableId = config.TABLE_ID.BOOKSHELF,
  Books = new wx.BaaS.TableObject(tableId)

  Books.find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let addBook = (ctx, cb) => {

  let tableId = config.TABLE_ID.BOOKSHELF,
    Books = new wx.BaaS.TableObject(tableId),
    Book = Books.create(),
    bookName = ctx.data.creatingBookName

  let data = {
    bookName,
  }

  Book.set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

let updateBook = (ctx, cb) => {
  let tableId = config.TABLE_ID.BOOKSHELF,
    recordId = ctx.data.curRecordId,
    bookName = ctx.data.editingBookName

  let Books = new wx.BaaS.TableObject(tableId),
    Book = Books.getWithoutData(recordId)

  let data = {
    bookName
  }

  Book.set(data)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let deleteBook = (ctx, cb) => {
  let tableId = config.TABLE_ID.BOOKSHELF,
    recordId = ctx.data.curRecordId

  let Books = new wx.BaaS.TableObject(tableId)

  Books.delete(recordId)
    .then(res => cb(res))
    .catch(err => console.dir(err))
}


let getUserProfile = (ctx, cb) => {
  let tableId = config.TABLE_ID.PROFILE,

  Users = new wx.BaaS.TableObject(tableId),
  uid = Number(wx.BaaS.storage.get('uid'))
  console.log(uid);
  let query = new wx.BaaS.Query()
  query.compare('created_by', '=', uid)

  Users.setQuery(query)
    .find()
    .then(res =>  cb(res))
    .catch(err => console.dir(err))
}

let addUser = (data, ctx) => {
  let tableId = config.BAAS.TABLE_ID,
    Users = new wx.BaaS.TableObject(tableId),
    User = Users.create()

  return User.set(data).save()
}

let updateUser = (params, ctx) => {
  let tableId = config.BAAS.TABLE_ID,
    { name, phone, company, recordId } = params

  let is_member = params.is_member ? params.is_member : false

  let Users = new wx.BaaS.TableObject(tableId),
    User = Users.getWithoutData(recordId)

  let data = {
    name,
    phone,
    company,
    is_member,
  }

  User.set(data)

  return User.update()

}



//获取主页信息列表
let getContentList = (ctx, cb) => {
  let contentId = config.CONTENT_ID.MEALS,
  Contents = new wx.BaaS.ContentGroup(contentId)
  Contents.find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}
//获取法人信息
let getPerson = (ctx, cb) => {
  let personId = config.TABLE_ID.PERSON,
  Person = new wx.BaaS.TableObject(personId)
  let query = new wx.BaaS.Query()
  query.compare('phone', '=',ctx.data.phone)
  Person.setQuery(query)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook, 
  getUserProfile,
  addUser,
  updateUser,
  getContentList, //得到主页信息列表
  getPerson
}

