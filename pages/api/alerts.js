import prisma from '../../prisma/client';

export const config = { api: { bodyParser: true } };

async function create(alert) {
  const { title, quantity, productId } = alert;
  let sqlResult = {};
  try {
    sqlResult = await prisma.alert.create({
      data: { title, quantity, productId }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not create alert" }];
  }
  return [200, { sqlResult }];
}

async function read(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.alert.findUnique({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not find alert with id: ${id}` }];
  }
  return [200, { sqlResult }];
}

async function reads() {
  let sqlResult = {};
  try {
    sqlResult = await prisma.alert.findMany();
  } catch (err) {
    console.warn(err);
    return [500, { message: "Reads alerts" }];
  }
  return [200, { sqlResult }];
}

async function update(alert) {
  const { id, title, quantity, productId } = alert;
  let sqlResult = {};
  try {
    sqlResult = await prisma.alert.update({
      where: { id },
      data: { id, title, quantity, productId }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not update alert" }];
  }
  return [200, { sqlResult }];
}

async function deleteAlert(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.alert.delete({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not delete alert with id: ${id}` }];
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
  else if (method === "DELETE") result = await deleteAlert(body.id);
  const [status, message] = result;
  res.status(status).json(message);
}
