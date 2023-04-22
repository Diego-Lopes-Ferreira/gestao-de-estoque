import prisma from '../../prisma/client';

export const config = { api: { bodyParser: true } };

async function create(task) {
  const { date, due_date, complete_date, title, description, userId } = task;
  let sqlResult = {};
  try {
    sqlResult = await prisma.task.create({
      data: { date, due_date, complete_date, title, description, userId }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not create task" }];
  }
  return [200, { sqlResult }];
}

async function read(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.task.findUnique({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not find task with id: ${id}` }];
  }
  return [200, { sqlResult }];
}

async function reads() {
  let sqlResult = {};
  try {
    sqlResult = await prisma.task.findMany();
  } catch (err) {
    console.warn(err);
    return [500, { message: "Reads tasks" }];
  }
  return [200, { sqlResult }];
}

async function update(task) {
  const { id, date, due_date, complete_date, title, description, userId } = task;
  let sqlResult = {};
  try {
    sqlResult = await prisma.task.update({
      where: { id },
      data: { id, date, due_date, complete_date, title, description, userId }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not update task" }];
  }
  return [200, { sqlResult }];
}

async function deleteTask(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.task.delete({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not delete task with id: ${id}` }];
  }
  return [200, { sqlResult }];
}

export default async function handler(req, res) {
  const { method, body } = req;
  let result = [];
  if (method === "GET" && body.id == undefined) result = await reads();
  else if (method === "GET") result = await read(body.id);
  else if (method === "POST") result = await create(body);
  else if (method === "PUT") result = await update(body);
  else if (method === "DELETE") result = await deleteTask(body.id);
  const [status, message] = result;
  res.status(status).json(message);
}
