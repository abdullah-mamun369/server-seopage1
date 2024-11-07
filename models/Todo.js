const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    status: "string",
    clientName: 'string',
    clientImgUrl: 'string',
    userName: "string",
    userImg: "string",
    todoDetails: "string",

    totalPage: "number",
    userView1: "string",
    userView2: "string",
    totalRead: "number",
    totalComment: "number",
    totalAttachements: "number",
    date: "number",
})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = TodoModel